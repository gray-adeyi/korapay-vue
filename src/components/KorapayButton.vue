<script setup lang="ts">
import {ref} from 'vue'
import type {InitializePayload, PayResponse} from "../types.ts";
import useKorapay from "../composables/useKorapay.ts";
import Spinner from "./Spinner.vue";
import '@fontsource/roboto/500.css';

const props = withDefaults(defineProps<{ payload: InitializePayload, text?: string }>(), {
  text: 'Pay now'
});

const isInitializingPay = ref(false);

const {initPayWithKora} = useKorapay()

const emit = defineEmits<{
  close: [];
  success:[value: PayResponse];
  fail:[value: PayResponse];
  tokenized:[];
  pending:[];
}>()

async function initializePay() {
  isInitializingPay.value = true
  const finalPayload = {
    ...props.payload,
    onClose: () => {
      props.payload.onClose ? props.payload.onClose() : emit('close');
      isInitializingPay.value = false;
    },
    onSuccess: (data: PayResponse) => {
      props.payload.onSuccess ? props.payload.onSuccess(data) : emit('success', data);
      isInitializingPay.value = false;
    },
    onFailed:(data: PayResponse) => {
      props.payload.onFailed ? props.payload.onFailed(data) : emit('fail', data);
      isInitializingPay.value = false;
    },
    onTokenized: () => {
      props.payload.onTokenized ? props.payload.onTokenized : emit('tokenized');
      isInitializingPay.value = false;
    },
    onPending: () => {
      props.payload.onPending ? props.payload.onPending : emit('pending');
      isInitializingPay.value = false;
    }
  }
  await initPayWithKora(finalPayload)
}
</script>

<template>
  <slot name="button" :initPayWithKorapay="initializePay" :isInitializingPay="isInitializingPay" role="button">
    <button @click="initializePay" :disabled="isInitializingPay"><Spinner v-if="isInitializingPay" /><span>{{ text }}</span></button>
  </slot>
</template>

<style scoped>
button{
  --primary-color: #2376f3;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  padding: 1.1rem 1.87rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 10px;
  background: var(--primary-color);
  cursor: pointer;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  transition: all .3s ease;

  &:disabled{
    background: #98b8ea;
    opacity: .9;
    cursor: not-allowed;
  }
}
</style>
