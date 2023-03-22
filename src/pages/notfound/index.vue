<template>
  <div class="no-found">
    <van-empty :image="NoFound" image-size="200" :description="description" />
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import NoFound from '@/assets/404.png';
  import { ref } from 'vue';
  const route = useRoute();
  console.log(route.query);
  const description = ref('抱歉,您的页面丢失啦！请重新登录试试');
  if (route.query.type == 'abnormal') {
    description.value = '抱歉,数据请求失败！请重新登录试试';
  }
</script>

<style lang="scss">
  // .no-found {
  //   height: 100vh;
  //   display: flex;
  //   align-items: center;
  //   .van-empty {
  //     padding: 0 !important;
  //   }
  // }
</style>
