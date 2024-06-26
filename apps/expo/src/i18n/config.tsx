/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef } from "react";
import { I18nManager } from "react-native";
import { i18n } from "@lingui/core";
import { I18nProvider as DefaultI18nProvider } from "@lingui/react";

import { messages as messagesAr } from "~/i18n/locales/ar/messages";
import { messages as messagesBe } from "~/i18n/locales/be/messages";
import { messages as messagesCs } from "~/i18n/locales/cs/messages";
import { messages as messagesDe } from "~/i18n/locales/de/messages";
import { messages as messagesEn } from "~/i18n/locales/en/messages";
import { messages as messagesEs } from "~/i18n/locales/es/messages";
import { messages as messagesFr } from "~/i18n/locales/fr/messages";
import { messages as messagesHr } from "~/i18n/locales/hr/messages";
import { messages as messagesJa } from "~/i18n/locales/ja/messages";
import { messages as messagesMl } from "~/i18n/locales/ml/messages";
import { messages as messagesPt } from "~/i18n/locales/pt/messages";
import { messages as messagesUk } from "~/i18n/locales/uk/messages";
import {
  appPreferencesStore,
  useAppLanguage,
  type AppPreferences,
} from "~/lib/storage/app-preferences";

export function languageCodeToName(code: AppPreferences["appLanguage"]) {
  switch (code) {
    case "en": {
      return "English";
    }
    case "ja": {
      return "日本語";
    }
    case "de": {
      return "Deutsch";
    }
    case "fr": {
      return "Français";
    }
    case "be": {
      return "Беларуская";
    }
    case "cs": {
      return "Čeština";
    }
    case "ml": {
      return "മലയാളം";
    }
    case "pt-BR": {
      return "Português (BR)";
    }
    case "uk": {
      return "Українська";
    }
    case "hr": {
      return "Hrvatski";
    }
    case "es": {
      return "Español";
    }
    case "ar": {
      return "العربية";
    }
    // case "nl": {
    //   return "Nederlands";
    // }
    default:
      throw new Error(`Unknown language code: ${code as string}`);
  }
}

export function loadAndActivateLanguage(locale: AppPreferences["appLanguage"]) {
  if (locale === "ar") {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  switch (locale) {
    case "ja": {
      i18n.loadAndActivate({ locale, messages: messagesJa });
      break;
    }
    case "de": {
      i18n.loadAndActivate({ locale, messages: messagesDe });
      break;
    }
    case "fr": {
      i18n.loadAndActivate({ locale, messages: messagesFr });
      break;
    }
    case "be": {
      i18n.loadAndActivate({ locale, messages: messagesBe });
      break;
    }
    case "cs": {
      i18n.loadAndActivate({ locale, messages: messagesCs });
      break;
    }
    case "ml": {
      i18n.loadAndActivate({ locale, messages: messagesMl });
      break;
    }
    case "pt-BR": {
      i18n.loadAndActivate({ locale, messages: messagesPt });
      break;
    }
    case "uk": {
      i18n.loadAndActivate({ locale, messages: messagesUk });
      break;
    }
    case "hr": {
      i18n.loadAndActivate({ locale, messages: messagesHr });
      break;
    }
    case "es": {
      i18n.loadAndActivate({ locale, messages: messagesEs });
      break;
    }
    case "ar": {
      i18n.loadAndActivate({ locale, messages: messagesAr });
      break;
    }
    // case "nl": {
    //   i18n.loadAndActivate({ locale, messages: messagesNl });
    //   break;
    // }
    default: {
      i18n.loadAndActivate({ locale, messages: messagesEn });
      break;
    }
  }
}

export function initializeI18n() {
  loadAndActivateLanguage(appPreferencesStore.getState().appLanguage);
}

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = useAppLanguage();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    loadAndActivateLanguage(language);
  }, [language]);

  return <DefaultI18nProvider i18n={i18n}>{children}</DefaultI18nProvider>;
}
