import { z, RefinementCtx } from "zod";

export const formSchemaRegister = z
  .object({
    name: z.string().optional(),
    image: z.string().optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 character(s)" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords didnt match",
        path: ["confirmPassword"],
      });
    }
  });

export const formSchemaLogin = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
});
