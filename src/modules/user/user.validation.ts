import { z } from "zod";

// const userValidationSchema = z.object({
//   id: z.string(),
//   password: z
//     .string({ invalid_type_error: "Password must be string !" })
//     .max(20, { message: "password cannot br more than 20 characters" })
//     .optional(),
//    needsPasswordChange: z.boolean().optional().default(true),
//   role: z.enum(["admin", "student", "faculty"]),
//   status: z.enum(["in-progress", "blocked"]).default("in-progress"),
//   isDeleted: z.boolean().optional().default(false),
// });

const userValidationSchema = z.object({
  pasword: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
});
export const UserValidation = {
  userValidationSchema,
};
