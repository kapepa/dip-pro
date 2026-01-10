import { NextPage } from "next";
import { Suspense } from "react";
import CheckoutView from "./components/checkout-view";
import CheckoutLoading from "./components/checkout-loading";

const CheckoutPage: NextPage = () => {
  return (
    <Suspense
      fallback={<CheckoutLoading />}
    >
      <CheckoutView />
    </Suspense>
  )
}

export default CheckoutPage;