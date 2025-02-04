"use client";
import { useChangeLocale, useCurrentLocale } from "../locales/client";

export default function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <>
      <p>Current locale: {locale}</p>
      <button className="mr-4" onClick={() => changeLocale("en")}>
        English
      </button>
      <button className="mr-4" onClick={() => changeLocale("th")}>
        Thai
      </button>
    </>
  );
}
