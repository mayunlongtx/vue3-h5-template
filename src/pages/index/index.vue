<template>
  <div class="index-container p-2">
    {{ count }}

    <div
      @click="increment"
      class="text-2 bg-red w-10 text-center rounded-lg text-white mx-auto my-2 display-inline-block"
      >加一</div
    >
    <div
      @click="doubleCount"
      class="text-2 bg-green-500 w-10 text-center rounded-lg text-white mx-auto my-2 display-inline-block"
      >翻倍</div
    >
    <van-divider />

    <div>
      <div class="c-red text-2 text-weight-600"
        >名称：{{ appStore.roleStore.skill.skillState.name }}</div
      >
      <div class="c-red text-2 text-weight-600"
        >技能CD：{{ appStore.roleStore.skill.skillState.intervalTime
        }}{{ appStore.roleStore.skill.skillState.unit }}</div
      >
    </div>
    <button
      @click="handleChangeSkill"
      class="bg-green-500 c-white border-none border-radius-15 rounded-lg text-2 w-10 py-1"
      >改变技能</button
    >
    <!-- 动画 -->
    <!-- <Animation class="h-100" /> -->
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { showToast } from 'vant';
  import appStore from '@/store';
  const { count } = storeToRefs(appStore.useCounterStoreSetup);
  const { increment, doubleCount } = appStore.useCounterStoreSetup;
  console.log(appStore.roleStore.skill.skillState);
  // 这里可以配置页面title
  defineOptions({
    pageTitle: '示例页面',
  });
  function handleChangeSkill() {
    showToast('。。。')
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
    // height: 100vh;
  }
</style>
