import { I18nProviderClient } from "@/locales/client";
import "../../globals.css";
import ShareComponent from "@/components/ShareComponent";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; device: string }>;
}>) {
  const { locale, device } = await params;
  return (
    <html>
      <body>
        <I18nProviderClient locale={locale}>
          {device === "desktop" ? <ShareComponent /> : <div>Mobile Topbar</div>}
          {children}
        </I18nProviderClient>
      </body>
    </html>
  );
}
