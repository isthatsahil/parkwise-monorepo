"use client";
import React from "react";
import { Roles } from "@parkwise/util/types";
import {
  useRegisterForm,
  FormTypeRegister,
} from "@parkwise/forms/src/hooks/useRegisterForm";
import { RegisterWithCredentialsDocument } from "@parkwise/network/src/gql/generated";
import { useMutation } from "@apollo/client";
import { Button } from "../ui/button";
import PasswordInput from "../atoms/PasswordInput";
import { signIn } from "next-auth/react";
import PasswordStrengthBar from "react-password-strength-bar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { Lock } from "lucide-react";

export type IRegisterFormProps = {
  className?: string;
  role?: Roles;
};
const RegisterForm = ({
  className,
  role,
}: IRegisterFormProps): React.JSX.Element => {
  const form = useRegisterForm();
  const [registerWithCredentials, { loading, data }] = useMutation(
    RegisterWithCredentialsDocument
  );
  async function onSubmit(values: FormTypeRegister) {
    const { confirmPassword, ...registerFormFields } = values;
    const { data, errors } = await registerWithCredentials({
      variables: {
        registerWithCredentialsInput: registerFormFields,
      },
    });
    if (errors) {
      toast.error("Uh Oh! Something went wrong");
    }
    if (data) {
      toast.success(
        `User ${data?.registerWithCredentials?.name ? data?.registerWithCredentials?.name : data?.registerWithCredentials?.uid} created`
      );
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("password") && (
          <PasswordStrengthBar password={form.watch("password")} />
        )}

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Confirm Password"
                  {...field}
                  autoComplete="on"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
        <div className="mt-4 text-sm">Already have an account?</div>
        <Link href="/login" className="font-bold underline underline-offset-4">
          Sign in
        </Link>
      </form>
    </Form>
  );
};

export default RegisterForm;
