export enum Currency {
  NGN = "NGN",
  KES = "KES",
  GHS = "GHS",
  USD = "USD",
}

export enum PaymentChannel {
  CARD = "card",
  BANK_TRANSFER = "bank_transfer",
  MOBILE_MONEY = "mobile_money",
}

export type Customer = {
  readonly name: string;
  readonly email: string;
};

export type PayResponse = {
  readonly amount: number;
  readonly reference: string;
  readonly status: string;
};

export type InitializePayload = {
  readonly reference: string;
  readonly amount: number;
  readonly currency?: Currency;
  readonly customer: Customer;
  readonly notificationUrl?: string;
  readonly narration?: string;
  readonly channels?: PaymentChannel[];
  readonly defaultChannel?: PaymentChannel;
  readonly metadata?: Record<string, any>;
  readonly containerId?: string;
  readonly onClose?: () => void;
  readonly onSuccess?: (data: PayResponse) => void;
  readonly onFailed?: (data: PayResponse) => void;
  readonly onTokenized?: () => void;
  readonly onPending?: () => void;
  readonly merchantBearsCost?: boolean;
};

export type KorapayInitConfig = {
  readonly publicKey?: string;
  readonly currency?: Currency;
  readonly notificationUrl?: string;
  readonly channels?: PaymentChannel[];
  readonly defaultChannel?: PaymentChannel;
  readonly merchantBearsCost?: boolean;
};

export type KorapayScriptInitializePayload = InitializePayload & {
  readonly key: string;
};

export type KorapayScriptAPI = {
  readonly initialize: (
    payload: KorapayScriptInitializePayload,
  ) => Promise<void>;
};

export type KorapayContextAPI = {
  readonly config: KorapayInitConfig;
};
