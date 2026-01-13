import z from "zod";

export const formLoginSchema = z.object({
  email: z
    .email("Будь ласка, введіть дійсну адресу електронної пошти")
    .min(1, "Необхідно вказати адресу електронної пошти"),
  password: z.string()
    .min(6, "Пароль має містити щонайменше 6 символів")
    .min(1, "Необхідно ввести пароль")
});

export const formRegisterSchema = formLoginSchema.extend({
  confirmPassword: z.string()
    .min(1, "Необхідно підтвердити пароль"),
  fullName: z.string()
    .min(1, "Необхідно ввести повне ім'я")
    .min(2, "Ім'я має містити щонайменше 2 символи"),
  phone: z.string()
    .min(1, { message: "Необхідно ввести номер телефону" })
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 12 && val.startsWith('380'), {
      message: "Введіть коректний український номер телефону"
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Паролі не співпадають",
  path: ["confirmPassword"]
});

export const formProfileSchema = formRegisterSchema
  .omit({ password: true, confirmPassword: true })
  .extend({
    password: z.string()
      .min(6, "Пароль має містити щонайменше 6 символів")
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string()
      .optional()
      .or(z.literal(''))
  })
  .refine((data) => {
    if (data.password && data.confirmPassword) {
      return data.password === data.confirmPassword;
    }
    return true;
  }, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"]
  });

export type FormLoginValues = z.infer<typeof formLoginSchema>;
export type FormRegisterValues = z.infer<typeof formRegisterSchema>;
export type FormProfileValues = z.infer<typeof formProfileSchema>;