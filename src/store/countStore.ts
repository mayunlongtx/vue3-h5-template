import { ref } from 'vue';
import { defineStore } from 'pinia';

// 使用 setup 模板定义
export const useCounterStoreSetup = defineStore('counterForSetup', () => {
  const count = ref<number>(0);
  function increment() {
    count.value++;
  }
  function doubleCount() {
    count.value = count.value * 2;
  }
  return { count, increment, doubleCount };
});
