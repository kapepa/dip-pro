import { InfoBlock } from "@/components/shared/info-block";
import { NextPage } from "next";

const NotAuthPage: NextPage = () => {
  return (
    <div
      className="
        min-h-screen
        flex flex-col items-center justify-center
        px-4
        sm:px-6
        md:px-8
      "
    >
      <InfoBlock
        title="Доступ заборонено"
        text="Дану сторінку можуть переглядати тільки авторизовані користувачі"
        imageUrl="/assets/images/lock.png"
        className="
          max-w-[320px]
          sm:max-w-[420px]
          md:max-w-[520px]
          lg:max-w-[600px]
        "
      />
    </div>
  );
};

export default NotAuthPage;
