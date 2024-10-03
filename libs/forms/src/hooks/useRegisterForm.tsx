import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaRegister } from "../schema";

export type FormTypeRegister = z.infer<typeof formSchemaRegister>;

export const useRegisterForm = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(formSchemaRegister),
  });
