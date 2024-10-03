"use client";
import React from "react";
import {
  FormTypeLogin,
  useLoginForm,
} from "@parkwise/forms/src/hooks/useLoginForm";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import PasswordInput from "../atoms/PasswordInput";

export type ILoginForm = {
  className?: string;
};
const LoginForm = ({ className }: ILoginForm): React.JSX.Element => {
  const form = useLoginForm();
  const { replace } = useRouter();

  async function onSubmit(values: FormTypeLogin) {
    const { email, password } = values;
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) {
        toast.success("login successful");
        replace("/");
      }
      if (result?.error) {
        toast.error("Uh Oh! Something went wrong");
      }
    } catch (error) {
      toast.error("Uh Oh! Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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
                  {...field}
                  autoComplete="on"
                  placeholder="Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
        <div className="mt-4 text-sm">Do not have a Parkwise account?</div>
        <Link
          href="/register"
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
