import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  AuthProviderType,
  GetAuthProviderDocument,
  LoginDocument,
  RegisterWithCredentialsDocument,
  RegisterWithProviderDocument,
} from "@parkwise/network/src/gql/generated";
import { fetchGraphQL } from "../fetch";
import * as jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
const MAX_AGE = 24 * 60 * 60;

export const authOptions: NextAuthOptions = {
  // configure authentication providers
  providers: [
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Credentials provider configurations for email/password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorize function to validate user credentials
      async authorize(credentials) {
        // implement credentials validation logic
        // ...
        if (!credentials) throw new Error("Email and password requried");
        const { email, password } = credentials;
        try {
          const { data, error } = await fetchGraphQL({
            document: LoginDocument,
            variables: {
              loginInput: { email, password },
            },
          });

          if (!data?.login?.token || error) {
            throw new Error(
              "Authentication failed: Invalid credentials or user not found"
            );
          }
          const uid = data?.login?.user?.uid;
          const name = data?.login?.user?.name;
          const image = data?.login?.user?.image;

          return { id: uid, name, image, email };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  // enable debug mode for development
  debug: true,
  // configure session setting
  session: {
    strategy: "jwt",
    maxAge: MAX_AGE,
  },
  // configure jwt setting
  jwt: {
    maxAge: MAX_AGE,
    // custom JWT encoding function
    async encode({ token, secret }): Promise<string> {
      // implement custom JWT encoding logic
      if (!token) {
        throw new Error("Token is undefined");
      }
      const { sub, ...tokenProps } = token;
      // get the current date in seconds since the epoch
      const nowInSeconds = Math.floor(Date.now() / 1000);
      // calculate the expiration timestamp
      const expirationTimestamp = nowInSeconds + MAX_AGE;
      return jwt.sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: "HS256",
        }
      );
    },
    // custom JWT decoding function
    async decode({ token, secret }): Promise<JWT | null> {
      // implement custom JWT decoding logic
      if (!token) throw new Error("Token is undefined");
      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ["HS256"],
        });
        return decodedToken as JWT;
      } catch (error) {
        return null;
      }
    },
  },
  // configure callbacks functions
  callbacks: {
    // sign-in callback
    async signIn({ user, account }) {
      // implement sign-in logic, e.g. create user in database
      if (account?.provider === "google") {
        const { id, image, name } = user;
        const existingUser = await fetchGraphQL({
          document: GetAuthProviderDocument,
          variables: {
            uid: id,
          },
        });
        if (!existingUser?.data?.getAuthProvider?.uid) {
          const newUser = await fetchGraphQL({
            document: RegisterWithProviderDocument,
            variables: {
              registerWithProviderInput: {
                uid: id,
                name: name || "",
                image,
                type: AuthProviderType.Google,
              },
            },
          });
        }
      }
      return true;
    },
    // session callback
    async session({ token, session }) {
      // customize session object based on token data
      if (token) {
        session.user = {
          image: token.picture,
          uid: (token.uid as string) || "",
          email: token.email,
          name: token.name,
        };
      }
      return session;
    },
  },
  // configure custom pages
  pages: {
    signIn: "/signIn",
  },
};

export const getAuth = () => getServerSession(authOptions);
