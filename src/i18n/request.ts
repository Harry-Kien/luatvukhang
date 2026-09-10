import {resolveLocale} from "@/lib/locales";
import { getRequestConfig } from "next-intl/server";
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  return { locale: resolveLocale(requested), messages: {} };
});
