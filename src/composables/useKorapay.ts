import { inject } from "vue";
import { KORAPAY_CONTEXT_KEY } from "../plugins/korapay";
import type {
  InitializePayload,
  KorapayContextAPI,
  KorapayScriptInitializePayload,
} from "../types.ts";

export default function () {
  const korapay = inject<KorapayContextAPI>(KORAPAY_CONTEXT_KEY);

  async function initPayWithKora(payload: InitializePayload) {
    if (!korapay) {
      throw new Error(
        "Unable to inject korapay context API. Please ensure that the plugin was properly installed",
      );
    }
    const finalPayload: KorapayScriptInitializePayload = {
      ...payload,
      key: korapay.config.publicKey!,
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
