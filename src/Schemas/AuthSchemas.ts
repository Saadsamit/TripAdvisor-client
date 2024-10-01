import { z } from "zod";

export const LogInScheme = z.object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6),
  });

export const signupSchema = z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6),
    picture: z.string({ required_error: "picture is required" }),
  });

export const updateUserSchema = z.object({
    name: z.string({ required_error: "name is required" }),
    picture: z.string({ required_error: "picture is required" }),
  });