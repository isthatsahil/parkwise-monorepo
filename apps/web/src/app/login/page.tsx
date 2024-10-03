import React from "react";
import LoginForm from "@parkwise/ui/src/components/template/LoginForm";
import AuthLayout from "@parkwise/ui/src/components/molecules/AuthLayout";
const Page = () => {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Page;
