<template>
  <div class="loading">
    <!-- 可修改文案和加载图标的颜色 -->
    <van-loading color="#FF8627" vertical class="custom-loading" :size="isCare() ? '36px' : '24px'"
      >加载中...</van-loading
    >
  </div>
  <div class="bottom-tips">
    本服务由<span class="company">浙江政务服务网、嘉善县民政局</span>提供
    <br />
    服务咨询热线：<span class="phone" v-call-phone:value="'0573-84029656'">0573-84029656</span>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Notify } from 'vant';
  import { setToken, setUser, removeLocalStorage, getUser, jumpIndexPath } from '@/utils';
  import { currentInfo, zlbLogin } from '@/api/Login';
  import { isCare, isDev } from '@/utils/is';
  import { LOGIN_SUCCESS_PATH, LOGIN_SUCCESS_SERVICE_PATH } from '@/helpers';
  const emit = defineEmits(['login']);
  const router = useRouter();
  const route = useRoute();
  let ticket = ref('');

  const host = window.location.host;
  const href = decodeURIComponent(window.location.href);
  console.log('href --->', href);
  const t = 't=' + new Date().getTime();
  console.log(route, 'route');
  console.log('host --->', host);
  const types = href.split('typePath=')
  let typePath = types.length > 1 ? types[1] : '';
  if(types.length >1 && types[1]) {
    typePath = types[1]
  }
  
  console.log(host,'host')
  console.log(typePath, 'typePath');
  let jumpPath = `https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2001908337/reserved/index.html?type=${typePath}&${t}`;
  if (isDev()) {
    jumpPath = `http://ec.zlb.h5.alarmtech.com.cn?${t}&type=${typePath}`;
  } else if (host.indexOf('lastTest') != -1) {
    jumpPath = `https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2001908337/lastTest/index.html?1=1&type=${typePath}&debug=true&${t}`;
  }
  onMounted(() => {
    console.log(jumpPath, 'jumpPath');
    back();
    function back() {
      const sUserAgent = window.navigator.userAgent.toLowerCase();
      const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
      if (bIsDtDreamApp) {
        window.addEventListener(
          'pageshow',
          function (event) {
            if (
              event.persisted ||
              (window.performance && window.performance.navigation.type == 2)
            ) {
              ZWJSBridge.onReady(() => {
                console.log('初始化成功了，为了返回');
                ZWJSBridge.close()
                  .then((result) => {
                    console.log('router', result);
                  })
                  .catch((error) => {
                    console.log(error, '----router error');
                  });
              });
            }
          },
          false,
        );
      }
    }
    removeLocalStorage();
    getTicket();
  });
  let sps = ref('');
  function getTicket() {
    const url = window.location.href;
    if (url.indexOf('ticket') != -1) {
      const params = url.split('?')[1].split('&');
      console.log(params, 'params');
      const paramList = params.map((item) => {
        return item.split('=');
      });
      const param = paramList.filter((item) => item[0] == 'ticket');
      sps.value = paramList.filter((item) => item[0] == 'sp');
      let sp = '';
      // 判断是不是包含浙里康养路由 如果包含则跳转到浙里康养路由
      if (sps.value) {
        sp = sps.value[0][1];
      }
      ticket.value = param[0][1];
      if (ticket.value && ticket.value != '') {
        if (ticket.value != localStorage.getItem('ticket')) {
          localStorage.setItem('ticket', ticket.value);
          ZWJSBridge.onReady(() => {
            console.log('初始化完成后，执⾏bridge⽅法');
            onSubmit(sp);
          });
        }
      }
    } else {
      loginFail();
    }
  }
  function loginFail() {
    const sUserAgent = window.navigator.userAgent.toLowerCase();
    const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
    // console.log(bIsDtDreamApp, '--------------->bIsDtDreamApp');
    const bIsAlipayMini =
      sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1; // 浙里办支付宝小程序
    if (bIsDtDreamApp) {
      window.location.replace(
        'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=3be32337c2904942b5cf18a13756d5ed&goto=' +
          encodeURIComponent(jumpPath),
      ); // 注意这里需要使用replace
    } else if (bIsAlipayMini) {
      window.location.replace(
        'https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=3be32337c2904942b5cf18a13756d5ed&goto=' +
          encodeURIComponent(jumpPath),
      );
    }
  }

  function onSubmit(sp) {
    zlbLogin({
      st: ticket.value,
    }).then((res: any) => {
      console.log(res);
      if (res.isSuccess) {
        console.log();
        setToken(res.data.token);
        getCurrentInfo(res.data, sp);
      }
    });
  }

  function getCurrentInfo(userInfo, sp) {
    currentInfo().then((res: any) => {
      console.log(userInfo, 'userInfo----');
      setUser(Object.assign(userInfo, res.data));
      loginSuccess(sp);
    });
  }

  function loginSuccess(sp) {
    Notify({ type: 'success', message: '登录成功' });
    // emit('login', true);
    console.log(sp, 'spspsp');
    // if (sp) {
    //   if (sp.indexOf('http') != -1) {
    //     if (sp.indexOf('?') != -1) {
    //       sp = sp + '&ticket=' + ticket.value;
    //       // window.location.replace(decodeURI(sp) + '?ticket=' + ticket.value);
    //       window.location.href = decodeURI(sp) + '?ticket=' + ticket.value;
    //     } else {
    //       // window.location.replace(decodeURI(sp) + '?ticket=' + ticket.value);
    //       window.location.href = decodeURI(sp) + '?ticket=' + ticket.value;
    //     }
    //   } else {
    //     router.replace(sp);
    //   }
    // } else {
    // router.replace(LOGIN_SUCCESS_PATH);
    setTimeout(() => {
      if (typePath && typePath != 'null' && typePath != 'undefined') {
        router.replace(`/${typePath}`);
      } else {
        jumpIndexPath(router);
      }
    }, 500);
    // }
  }
</script>

<style lang="scss" scoped>
  .bottom-tips {
    width: 100%;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 12px;
    text-align: center;
    .phone {
      color: blue;
    }
  }
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
