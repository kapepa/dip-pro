import { InfoBlock } from "@/components/shared/info-block";
import { NextPage } from "next";

const NotAuthPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ заборонено"
        text="Дану сторінку можуть переглядати тільки авторизовані користувачі"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  )
}

export default NotAuthPage