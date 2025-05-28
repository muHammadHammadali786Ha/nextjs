import {z} from "zod";  


export const loginSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
  });



  // schemas/signupSchema.js
export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .nonempty("Username is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
  confirm_password: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long")
    .nonempty("Confirm Password is required"),
  role: z
    .enum(["student", "employee"], "Role must be either 'student' or 'employee'")
    .default("student"),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords do not match",
});
