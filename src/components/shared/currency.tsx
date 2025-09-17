"use client";

import { FC, ReactNode, useEffect, useState } from "react";

interface CurrencyProps {
  children: ReactNode;
}

const Currency: FC<CurrencyProps> = (props) => {
  const { children } = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return the same structure but without formatting during SSR
    return <span>{children}</span>;
  }

  return (
    <span>
      {new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
      }).format(Number(children))}
    </span>
  );
};

export { Currency };