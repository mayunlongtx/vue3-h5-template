<template>
  <div :class="{ care: careFlag }">
    <router-view v-slot="{ Component }">
      <keep-alice>
        <component :is="Component"></component>
        <!-- <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" /> -->
      </keep-alice>
      <!-- <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" /> -->
    </router-view>
    <div class="switch-home-container" v-if="Object.values(relativesUserInfo).length">
      <div class="other-switch" v-if="nowType == 'normal'" @click="handleRelatives('home')">{{
        encryptionName(relativesUserInfo.name)
      }}</div>
      <div
        class="other-switch home switch-other"
        v-if="nowType == 'home'"
        @click="handleRelatives('normal')"
      >
        <img class="switch-other" src="@/assets/home.png" alt="" /> 首页</div
      >
    </div>
    <div class="bottom-tips" v-if="showTips">
      本服务由<span class="company">浙江政务服务网、嘉善县民政局</span>提供
      <br />
      服务咨询热线：<span class="phone" v-call-phone:value="'0573-84029656'">0573-84029656</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { isDev } from '@/utils/is';
  import { ZLB_UI_STYLE } from './helpers';
  import { encryptionName, jumpIndexPath, setToken, setUser } from '@/utils';
  import { useClickAway } from '@vant/use';
  const route = useRoute();
  const router = useRouter();
  const switchHomeEl = ref();
  const showTips = ref(false);
  const tipsRoutes = ['/login', '/index', '/relatives', '/index/service_personnel','/healthcare'];
  document.addEventListener('mousedown', (e) => {
    if (!e.target.classList.contains('switch-other')) {
      nowType.value = 'normal';
    }
  });
  watch(route, (newVal, oldVal) => {
    window.scrollTo(0, 0);
    console.log(tipsRoutes.includes(newVal.path));
    showTips.value = tipsRoutes.includes(newVal.path);
    // console.log('我更新了');
    changeRoute();
  });
  // useClickAway(switchHomeEl, () => {
  //   console.log('click outside!');
  //   nowType.value = 'normal';
  // });
  const careFlag = ref(true);
  if (isDev()) {
    const uiStyle = localStorage.getItem('uiStyle');
    // localStorage.setItem('uiStyle', 'normal');
    careFlag.value = uiStyle == 'elder';
  }
  ZWJSBridge.onReady(() => {
    ZWJSBridge.getUiStyle({})
      .then((result) => {
        careFlag.value = result.uiStyle !== ZLB_UI_STYLE;
        console.log(careFlag.value);
      })
      .catch((error) => {
        careFlag.value = false;
      });
  });
  // 获取代办人信息
  const relativesUserInfo = ref(JSON.parse(localStorage.getItem('relativesUserInfo') || '{}'));
  const nowType = ref('normal');
  function changeRoute() {
    nowType.value = 'normal';
    relativesUserInfo.value = JSON.parse(localStorage.getItem('relativesUserInfo') || '{}');
  }
  function handleRelatives(type) {
    if (type != 'home') {
      setUser(relativesUserInfo.value);
      setToken(relativesUserInfo.value.token);
      setTimeout(() => {
        localStorage.removeItem('relativesUserInfo');
        relativesUserInfo.value = {};
        jumpIndexPath(router);
      });
      nowType.value = type;
    } else {
      nowType.value = type;
    }
  }
</script>
<style lang="scss" scoped>
  .switch-home-container {
    position: fixed;
    top: 55%;
    right: 0;
    z-index: 999;
    .other-switch {
      width: 52px;
      height: 52px;
      line-height: 52px;
      background: #ff8b30;
      border-radius: 50%;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      &.home {
        width: 53px;
        height: 52px;
        padding: 0 20px 0 16px;
        background: #ff8b30;
        border-radius: 26px 0px 0px 26px;
        display: flex;
        align-items: center;
        justify-content: start;
        img {
          margin-left: 2px;
          height: 18px;
          width: 18px;
        }
      }
    }
  }
  .bottom-tips {
    width: 100%;
    height: 50px;
    // line-height: 80px;
    /*     position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0); */
    font-size: 12px;
    text-align: center;
    background: #f3f3f5;
    .phone {
      color: blue;
    }
  }
</style>
