<template>
  <div class="page-cotainer login-cotainer">
    <div class="title">欢迎来到嘉善养老服务运营平台</div>

    <div class="login-form">
      <div class="login-title">登录</div>
      <div class="login-title-sub">输入您的身份证号登录</div>

      <van-field
        v-model="username"
        label-width="52"
        placeholder="请输入身份证"
        :rules="[{ required: true, message: '请输入身份证' }]"
      >
        <template #label>
          <img class="login-icon" src="@/assets/login_password.png" />
        </template>
      </van-field>
      <van-field
        v-model="password"
        label-width="52"
        type="password"
        placeholder="请输入您的密码"
        :rules="[{ required: true, message: '请输入您的密码' }]"
      >
        <template #label>
          <img class="login-icon" src="@/assets/login_password.png" />
        </template>
      </van-field>
      <div class="login-btn">
        <van-button block type="primary" @click="onSubmit" :disabled="isDisabled">
          登录
        </van-button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRouter,useRoute } from 'vue-router';
  import { Notify } from 'vant';
  import { setToken, setUser, getUser, removeLocalStorage, jumpIndexPath, setDev } from '@/utils';
  import { login, currentInfo } from '@/api/Login';

  const route = useRoute();
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  let isDisabled = ref(true);
  // 1. 获取路由参数
  // 2. 如果存在就将其作为路由进行跳转
  const typePath = route.query.type;
  console.log(typePath, 'typePath');
  onMounted(() => {
    removeLocalStorage();
    watch(username, (val) => {
      isDisabled.value = !(val && password.value);
      setTimeout(() => {
        password.value = username.value.substr(-6);
      }, 1000);
    });
    watch(password, (val) => {
      isDisabled.value = !(val && username.value);
    });
  });
  const onSubmit = () => {
    login({
      account: username.value,
      password: password.value,
      grantType: 'password',
    }).then((res: any) => {
      // console.log(res);
      setDev(res.data.dev)
      setToken(res.data.token);
      getCurrentInfo(res.data);
    });
  };
  function getCurrentInfo(userInfo) {
    currentInfo().then((res: any) => {
      setUser(Object.assign(userInfo, res.data));
      loginSuccess();
    });
  }
  function loginSuccess() {
    Notify({ type: 'success', message: '登录成功' });
    setTimeout(() => {
      if(typePath && typePath != 'null') {
        router.replace(`/${typePath}`);
      }else {
        jumpIndexPath(router);
      }
    }, 500);
  }
  
</script>

<style lang="scss" scoped>
  .page-cotainer {
    height: calc(100vh - 32px);
    background: url(@/assets/login_bg.png) center top no-repeat;
    background-size: 100%;
    .title {
      font-size: 22px;
      font-family: PangMenZhengDao;
      color: #ffffff;
      line-height: 25px;
      text-align: center;
      padding-top: 28px;
    }
    .login-form {
      margin-top: 122px;
      background: #ffffff;
      border-radius: 14px 14px 0px 0px;
      padding: 20px 24px;
      .login-title {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 37px;
        margin-left: 17px;
      }

      .login-title-sub {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 21px;
        margin-left: 17px;
        margin-bottom: 15px;
      }

      .login-icon {
        width: 24px;
        height: 24px;
      }
      .login-btn {
        margin-top: 170px;
      }
    }
  }
</style>
