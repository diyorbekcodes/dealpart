import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Main from "../../components/layout/Main";

export default function page() {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Suspense fallback={null}>
        <Main />
      </Suspense>
    </>
  );
}
