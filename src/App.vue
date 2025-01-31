<script setup lang="ts">

  import KorapayButton from "./components/KorapayButton.vue";
  import {Currency, type Customer} from "./types.ts";
  import {computed, ref} from "vue";

  const amount = ref(1000)
  const customer = ref<Customer>({
    name: 'John Doe',
    email: 'jd@example.com'
  })

  const payload = computed(()  => ({
    reference: crypto.randomUUID(),
    amount: amount.value,
    currency: Currency.NGN,
    customer: customer.value,
  }))

  const buttonText = computed(()=> `Pay ${amount.value} now`)
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