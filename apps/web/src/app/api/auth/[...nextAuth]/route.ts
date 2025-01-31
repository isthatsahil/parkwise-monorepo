import NextAuth from "next-auth/next";
import { authOptions } from "@parkwise/network/src/config/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
