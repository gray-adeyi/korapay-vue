<script setup lang="ts">
import SpinnerIcon from '../assets/spinner.svg'
</script>

<template>
<SpinnerIcon class="spinner" />
</template>

<style scoped>
.spinner{
  --size: 20px;
  width: var(--size);
  height: var(--size);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>