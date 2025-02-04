'use client'
import { Suspense } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Sub() {
  return (
    <Suspense fallback={"Loading..."}>
      <LanguageSwitcher />
    </Suspense>
  );
}
