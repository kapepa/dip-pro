import { MyselfDTO } from "./dto/myself.dto";
import { axiosInstance } from "./instance"

export async function myself() {
  try {
    const profile = await axiosInstance.get<MyselfDTO>("/auth/myself");
    return profile.data;
  } catch (err) {
    console.log(err)
  }
}