import { getI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

// export async function generateStaticParams() {
//   return [];
// }

// export const revalidate = 60;

export default async function DevicePage({
  params,
}: {
  params: Promise<{ locale: string; device: string }>;
}) {
  const { locale, device } = await params;
  // setStaticParamsLocale(locale);
  const t = await getI18n();
  return (
    <div>
      <div>SSG Page</div>
      <div>
        Generate on{" "}
        {new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Bangkok" })}
      </div>
      <div>Current device: {device}</div>
      <p>{t("welcome", { name: "John" })}</p>
      <p>{t("welcome", { name: <strong>John</strong> })}</p>
    </div>
  );
}
