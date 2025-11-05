import { User } from "@prisma/client";

export type MyselfDTO = Pick<User, "email" | "fullName"> & {
  phone: NonNullable<User["phone"]>;
};
