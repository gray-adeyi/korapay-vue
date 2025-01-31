import KorapayButton from "../../components/KorapayButton.vue";
import type { App, Plugin } from "vue";
import type { KorapayContextAPI, KorapayInitConfig } from "../../types.ts";

const COLLECTION_SCRIPT_URL =
  "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js";

export const KORAPAY_CONTEXT_KEY = Symbol("$korapay");

export async function initKorapay(
  config: KorapayInitConfig,
): Promise<Plugin<[]>> {
  const key = config.publicKey || import.meta.env.VITE_KORAPAY_PUBLIC_KEY;
  if (!key) {
    throw new Error(
      'Your Korapay integration public api key is missing. Please provide it by passing it to the "initKorapay" function or by setting it in your environmental variables as VITE_KORAPAY_PUBLIC_KEY',
    );
  }
  await loadCollectionScript();
  const korapay: KorapayContextAPI = { config: { ...config, publicKey: key } };
  return {
    install(app: App) {
      app.component("KorapayButton", KorapayButton);
      app.provide(KORAPAY_CONTEXT_KEY, korapay);
    },
  };
}

function loadCollectionScript() {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[src="${COLLECTION_SCRIPT_URL}"]`,
    );
    if (existingScript) {
      resolve(undefined);
      return;
    }

    const script = document.createElement("script");
    script.src = COLLECTION_SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      resolve(undefined);
    };

    script.onerror = () => {
      reject(
        new Error(
          `Failed to load korapay collection script: ${COLLECTION_SCRIPT_URL}`,
        ),
      );
    };

    document.head.appendChild(script);
  });
}
