# @gray-adeyi/korapay-vue

A Vue plugin for Korapay integration. 

## Features

- Typescript support
- Customizable pay button
- Composable for custom pay button implementation

## Installation

#### **Npm**

```bash
npm i @gray-adeyi/korapay-vue
```

#### **Yarn**

```bash
yarn add @gray-adeyi/korapay-vue
```

#### **Pnpm**

```bash
pnpm i @gray-adeyi/korapay-vue
```

#### **Bun**

```bash
bun add @gray-adeyi/korapay-vue
```

## Usage

After installation, update your `main.ts/main.js` file to register korapay as a
plugin like so.

```typescript
// File: src/main.ts

import { createApp } from "vue";
import App from "./App.vue";
import { initKorapay } from "@gray-adeyi/korapay-vue";

// The `initKorapay` function returns  a promise that resolve to a plugin that loads Korapay pay-in/collection script
// and registers the `KorapayButton` component to your project, hence the reason for re-writing it like so. The
// `initKorapay` function takes in a config with a type definition of `KorapayInitConfig` which let's you configure
// korapay with your publicKey, currency, notificationUrl e.t.c. an empty object may passed as seen below if your
// korapay's integration public key is set in your environmental variables as `VITE_KORAPAY_PUBLIC_KEY`. In a situation
// where this environmental variable is set and a publicKey is provided in the configs, the publicKey in the configs
// takes presedence.
(async () => {
  const app = createApp(App);

  // Wait for the plugin to resolve
  const korapay = await initKorapay({});

  // Use the resolved plugin
  app.use(korapay);

  app.mount("#app");
})();
```

Use the `KorapayButton` component where payment needs to be initiated.

```vue
// File src/App.vue
<script setup lang="ts">
  import {KorapayButton,Currency, type InitializePayload,  type Customer} from "@gray-adeyi/korapay-vue";
  import {computed, ref} from "vue";

  const amount = ref(1000)
  const customer = ref<Customer>({
    name: 'John Doe',
    email: 'jd@example.com'
  })

  const buttonText = computed(()=> `Pay ${amount.value} now`)
  
  const payload = computed(()  => ({
    reference: crypto.randomUUID(),
    amount: amount.value,
    currency: Currency.NGN,
    customer: customer.value,
  } as InitializePayload))
  
</script>

<template>
  <main>
    <div>
      <div>
        <label for="name">Name</label>
        <input name="name" type="text" v-model="customer.name"/>
      </div>
      <div>
        <label for="email">Email</label>
        <input name="email" type="text" v-model="customer.email"/>
      </div>
    </div>
   <div>
     <label for="amount">Amount</label>
     <input name="amount" type="number" v-model="amount"/>
   </div> 
    <div>
      <KorapayButton :payload="payload"/>
      <KorapayButton :payload="payload" :text="buttonText"/>
      <KorapayButton :payload="payload">
        <template #button="{ initPayWithKorapay, isInitializingPay }">
          <button @click="initPayWithKorapay"><span v-if="isInitializingPay">Loading... </span>Pay Fees</button>
        </template>
      </KorapayButton>
    </div>
  </main>
</template>

<style scoped>
</style>
```
The example above show three variations of using the `KorapayButton` component. The first uses the default button
styling and button text, the second updates the default button text and the third uses your button instead. This
makes it the most preferred variant when you need a button with your styling.

## API Reference

Coming soon...

## Sponsorship

Every little donation goes a long way. You can also give this project a star in
its Github repository it helps ♥️

- [Star on Github](https://www.github.com/gray-adeyi/korapay-vue)
- [Buy me a coffee](https://www.buymeacoffee.com/jigani)

## Contributing

You might encounter bugs while using this project or have feature enhancements
you'd like to share with the project. Create an issue on the project's
[github](https://www.github.com/gray-adeyi/korapay-vue) page.
