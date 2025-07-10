import { inject } from "vue";
import { KORAPAY_CONTEXT_KEY } from "../plugins/korapay";
import type {
  InitializePayload,
  KorapayContextAPI,
  KorapayScriptInitializePayload,
} from "../types.ts";

const COLLECTION_SCRIPT_URL =
    "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js";

export default function () {
  const korapay = inject<KorapayContextAPI>(KORAPAY_CONTEXT_KEY);

  async function initPayWithKora(payload: InitializePayload) {
    if (!korapay) {
      throw new Error(
        "Unable to inject korapay context API. Please ensure that the plugin was properly installed",
      );
    }
    await loadCollectionScript();
    const finalPayload: KorapayScriptInitializePayload = {
      ...payload,
      key: korapay.config.publicKey as string,
      currency: payload.currency || korapay.config.currency,
      notificationUrl: payload.notificationUrl ||
        korapay.config.notificationUrl,
      channels: payload.channels || korapay.config.channels,
      defaultChannel: payload.defaultChannel || korapay.config.defaultChannel,
      merchantBearsCost: payload.merchantBearsCost || payload.merchantBearsCost,
    };
    return window.Korapay.initialize(finalPayload);
  }

  return {
    initPayWithKora,
  };
}

function loadCollectionScript(): Promise<undefined> {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
        `script[src="${COLLECTION_SCRIPT_URL}"]`,
    );
    if (existingScript) {
      resolve(undefined);
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
