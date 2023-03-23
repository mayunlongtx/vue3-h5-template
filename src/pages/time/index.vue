<script setup lang="ts">
  import { ref } from 'vue';
  import {useTime} from './time'
  const {days} = useTime()
  const activeId = ref(1);
  const activeIndex = ref(0);
  console.log(days.value);
  const items = [
    {
      text: '浙江',
      children: [
        { text: '杭州', id: 1 },
        { text: '温州', id: 2 },
      ],
    },
    {
      text: '江苏',
      children: [
        { text: '南京', id: 4 },
        { text: '无锡', id: 5 },
        { text: '徐州', id: 6 },
      ],
    },
  ];
</script>

<template>
  <div>
    time

    <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="items"
    />
  </div>
</template>
<style scoped></style>
