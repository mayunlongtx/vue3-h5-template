<template>
  <div class="index-container">
    {{ count }}

    <div @click="increment">加一</div>
    <div @click="doubleCount">翻倍</div>
    <van-divider />

    <ul>
      <li class="c-red">名称：{{ appStore.roleStore.skill.skillState.name }}</li>
      <li
        >技能CD：{{ appStore.roleStore.skill.skillState.intervalTime
        }}{{ appStore.roleStore.skill.skillState.unit }}</li
      >
    </ul>
    <button
      @click="handleChangeSkill"
      class="bg-green-500 p-2 c-white border-none border-radius-15 rounded"
      >改变技能</button
    >
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';
  const { count } = storeToRefs(appStore.useCounterStoreSetup);
  const { increment, doubleCount } = appStore.useCounterStoreSetup;
  console.log(appStore.roleStore.skill.skillState);
  function handleChangeSkill() {
    appStore.roleStore.changeProfession({
      kill: {
        name: '新技能',
        intervalTime: Math.floor(Math.random() * 10),
        unit: '分钟',
      },
    });
  }
</script>

<style lang="scss" scoped>
  .index-container {
    height: 100vh;
  }
</style>
