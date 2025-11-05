import { FC } from "react";

interface VerificationUserProps {
  code: string,
}

const VerificationUser: FC<VerificationUserProps> = (props) => {
  const { code } = props;

  return (
    <div>
      <p>
        Код підтвердження <h2>{code}</h2>
      </p>
      <p>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?code=${code}`}
        >
          Підтвердити реєстрацію
        </a>
      </p>
    </div>
  )
}

export { VerificationUser }