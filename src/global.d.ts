export {};

declare global {
  interface Window {
    readonly Korapay: KorapayScriptAPI;
  }
}
