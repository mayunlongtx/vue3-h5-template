<script setup lang="ts">
  import { ref } from 'vue';
  import { useTime } from './time';
  const { days } = useTime({
    interval: 18,
    // startHour: 18,
    endHour: 19,
  });
  const activeId = ref(1);
  const activeIndex = ref(0);
  console.log(days.value);
</script>

<template>
  <div class="time-container">
    time
    <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="days"
    />
  </div>
</template>
<style scoped>
  .time-container {
    height: 100vh;
  }
</style>
