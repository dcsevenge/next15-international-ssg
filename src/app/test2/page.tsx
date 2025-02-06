import { getI18n } from "@/locales/server";

export default async function Test2Page() {
  const t = await getI18n();

  return (
    <>
      <div>Dynamic Page</div>
      <div>Test Page {t("sus")}</div>
      <div>Generate on {new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Bangkok' })}</div>
    </>
  );
}
