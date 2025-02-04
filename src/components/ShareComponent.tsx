// @ts-nocheck
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import LanguageSwitcher from "./LanguageSwitcher";

type IMenu = {
  label: string;
  slug: string;
  level: number;
  hasNext: boolean;
  items: any[];
  node: any;
  showcate: boolean;
};

export default async function ShareComponent() {
  const { menuList } = await getMegamenu();

  return (
    <header>
      <div className="flex">
        {menuList?.map((menu: IMenu, index: number) => (
          <div key={index} className="mr-4">
            {menu.label}
          </div>
        ))}
      </div>
      <div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

async function getMegamenu() {
  const locale = await getCurrentLocale();
  const t = await getScopedI18n("navigation");
  const result = await fetch(`http://localhost:3000/api/category`);
  const data = await result.json();
  const menuListFromLocale = mapCategories(data, locale);
  menuListFromLocale.unshift({
    label: t("campaign_label"),
    slug: `${locale}/campaign/designer`,
    hasNext: true,
    cms: true,
  });
  menuListFromLocale.unshift({
    label: t("brands_label"),
    slug: `${locale}/shopbybrand`,
    hasNext: true,
    cms: true,
  });
  menuListFromLocale.push({
    label: t("gift_label"),
    slug: `${locale}/category/gift`,
    hasNext: false,
  });
  menuListFromLocale.push({
    label: t("sale_label"),
    slug: `${locale}/sale`,
    hasNext: false,
  });
  return {
    menuList: menuListFromLocale,
  };
}

function mapCategories(data: any, locale: string) {
  // Determine the correct label field based on the locale
  const labelField = locale === "en" ? "catnameEN" : "catname";

  // Recursive function to process each category
  function mapNode(node: any) {
    return {
      label: node[labelField], // Use locale-specific label
      slug: node.slugname, // Keep the slug for linking
      level: node.Lv, // Category level
      hasNext: node.HAVENEXT, // Does it have more children?
      items: node.items ? node.items.map(mapNode) : [], // Recursively map children
      node: node,
      showcate: node.showcate,
    };
  }

  return data.map(mapNode);
}
