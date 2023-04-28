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
    <van-cell title="时间：" value="内容">
      <template #value>
        <van-count-down :time="time" />
      </template>
    </van-cell>

    <!-- 动画 -->
    <!-- <Animation class="h-100" /> -->
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { showToast } from 'vant';
  import appStore from '@/store';
  import { ref } from 'vue';
  const { count } = storeToRefs(appStore.useCounterStoreSetup);
  const { increment, doubleCount } = appStore.useCounterStoreSetup;
  console.log(appStore.roleStore.skill.skillState);
  // 这里可以配置页面title
  defineOptions({
    pageTitle: '示例页面',
  });
  function handleChangeSkill() {
    showToast('。。。');
    appStore.roleStore.changeProfession({
      kill: {
        name: '新技能',
        intervalTime: Math.floor(Math.random() * 10),
        unit: '分钟',
      },
    });
  }

  function enhancer(name: string) {
    return function enhancer(target: any) {
      target.prototype.name = name;
      target.prototype.age = '18';
    };
  }
  interface Calculate {
    name: string;
    age: string | number;
  }

  @enhancer('笑笑')
  class Calculate {
    constructor() {}
    subtraction() {
      console.log(this.name);
    }
  }
  const operate = new Calculate();
  operate.subtraction();

  const time = ref(0);
  const nowDate = new Date().getTime();
  const Y = new Date().getFullYear();
  const M = new Date().getMonth() + 1;
  const D = new Date().getDate();
  const lastDate = new Date(`${Y}-${M}-${D} 18:00:00`).getTime();
  time.value = lastDate - nowDate;
</script>

<style lang="scss" scoped>
  .index-container {
    // height: 100vh;
  }
</style>
