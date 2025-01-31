import { createApp } from "vue";
import App from "./App.vue";
import { initKorapay } from "./plugins/korapay";

(async () => {
  const app = createApp(App);

  // Wait for the plugin to resolve
  const korapay = await initKorapay({});

  // Use the resolved plugin
  app.use(korapay);

  app.mount("#app");
})();
