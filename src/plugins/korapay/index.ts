import KorapayButton from "../../components/KorapayButton.vue";
import type { App, Plugin } from "vue";
import type { KorapayContextAPI, KorapayInitConfig } from "../../types.ts";

export const KORAPAY_CONTEXT_KEY = Symbol("$korapay");

export function initKorapay(
  config?: KorapayInitConfig,
): Plugin<[]> {
  const key = config?.publicKey || import.meta.env.VITE_KORAPAY_PUBLIC_KEY;
  if (!key) {
    throw new Error(
      'Your Korapay integration public api key is missing. Please provide it by passing it to the "initKorapay" function or by setting it in your environmental variables as VITE_KORAPAY_PUBLIC_KEY',
    );
  }
  const korapay: KorapayContextAPI = { config: { ...config, publicKey: key } };
  return {
    install(app: App) {
      app.component("KorapayButton", KorapayButton);
      app.provide(KORAPAY_CONTEXT_KEY, korapay);
    },
  };
}

