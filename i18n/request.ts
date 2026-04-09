import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const namespaces = [
    "navigation",
    "page",
];
const loadMessages = async (namespace: string, locale: string) => {
    try {
        return (await import(`../../messages/${namespace}/${locale}.json`)).default;
    } catch {
        return (
            await import(`../../messages/${namespace}/${routing.defaultLocale}.json`)
        ).default;
    }
};

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;

    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    const messages = Object.assign(
        {},
        ...(await Promise.all(namespaces.map((ns) => loadMessages(ns, locale)))),
    );

    return {
        locale,
        messages,
    };
});