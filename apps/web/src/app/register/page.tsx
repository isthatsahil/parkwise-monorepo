import AuthLayout from "@parkwise/ui/src/components/molecules/AuthLayout";
import React from "react";
import RegisterForm from "@parkwise/ui/src/components/template/RegisterForm";
const Register = () => {
  return (
    <AuthLayout title="Register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
