import z from "zod";

export const CheckoutSchema = z.object({
  email: z.string().email("Будь ласка, введіть дійсну email адресу"),
  phone: z.string().min(10, "Номер телефону має містити щонайменше 10 символів"),
  address: z.string().min(5, "Адреса має містити щонайменше 5 символів"),
  comment: z.string().optional(),
  fullName: z.string().min(2, "Повне ім'я має містити щонайменше 2 символи"),
})

export type CheckoutFormType = z.infer<typeof CheckoutSchema>;