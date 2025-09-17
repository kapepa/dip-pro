import z from "zod";

export const CheckoutSchema = z.object({
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  comment: z.string().optional(),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
})

export type CheckoutFormType = z.infer<typeof CheckoutSchema>;