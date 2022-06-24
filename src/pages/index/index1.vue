<template>
  <div class="index-container">
    <div class="index-top">
      <div class="user-info">
        <van-image :src="userInfo.pic || Logo" round width="1.3rem" height="1.3rem"></van-image>
        <div class="text">{{ userInfo.name || '未知' }}</div>
      </div>
      <div class="phone">
        <img :src="Phone" round width="1rem" height="1rem" />
        <div class="text">养老服务热线</div>
      </div>
    </div>
    <!-- 享福利 -->
    <div class="welfare" @click="handleChangePath('/welfare')">
      <div class="title">享福利</div>
      <div class="btn">去查看</div>
    </div>
    <!-- 安心、学习 -->
    <div class="learning-heart">
      <div class="heart card" @click="handleChangePath('/heart')">
        <div class="title">保安全</div>
        <div class="btn">去查看</div>
      </div>
      <div class="stay card">
        <div class="title">选机构</div>
        <div class="btn" @click="handleChangePath('/stay')">去查看</div>
      </div>
    </div>
    <!-- 干活、健康、服务 -->
    <div class="work-health-service">
      <div class="service card" @click="handleChangePath('/service')">
        <div class="title">约服务</div>
        <div class="btn">去查看</div>
      </div>
      <div class="health-service card card-l">
        <div class="health" v-dev-tips> <div class="title">促健康</div></div>
        <div class="work" v-dev-tips> <div class="title">要干活</div></div>
      </div>
    </div>
    <!-- 入住、文娱-->
    <div class="stay-recreational">
      <div class="learning card card-l" v-dev-tips>
        <div class="title">想学习</div>
        <div class="btn">去查看</div>
      </div>
      <div class="recreational card card-l" v-dev-tips>
        <div class="title">爱文娱</div>
        <div class="btn">去查看</div>
      </div>
    </div>
    <!-- 轮播 -->
    <van-swipe :autoplay="2000" lazy-render class="custom-swipe">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" class="swipe-img" v-dev-tips />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import Logo from '@/assets/avatar.png';
  import Phone from '@/assets/phone.png';
  import Swipe1 from '@/assets/index/swipe_1.png';
  import { getUser, analyzeIDCard } from '@/utils';
  const images = [Swipe1, Swipe1];
  const userInfo = getUser();
  const router = useRouter();
  let userAgeAndSex: any = {};
  userAgeAndSex = analyzeIDCard(userInfo.account);

  function handleChangePath(path: string) {
    if (path == '/welfare') {
      if (userAgeAndSex.age >= 60) {
        router.push('/welfare');
      } else {
        router.push('/welfare/form_relatives');
      }
    } else {
      router && router.push(path);
    }
  }
</script>

<style lang="scss" scoped>
  .index-container {
    letter-spacing: 1px;
    font-family: SHISHANGZHONGHEIJIANTI;
    height: calc(100vh - 40px);
    padding: 20px 0;
    background: linear-gradient(180deg, #fff2f2 0%, #fff3ea 27%, #f3f3f5 100%);
    .index-top {
      margin: 0 auto 10px auto;
      width: 92%;
      height: 80px;
      background: linear-gradient(180deg, #ffe6e6 0%, #ffffff 100%);
      border-radius: 10px;
      border: 2px solid #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .user-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #474747;
        .text {
          margin-left: 10px;
        }
      }
      .phone {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #474747;
        img {
          width: 34px;
          height: 29px;
          border-radius: 50%;
        }
        .text {
          width: 100%;
          text-align: center;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: rgba(71, 71, 71, 0.8);
        }
      }
    }
    .welfare {
      width: calc(92% - 48px);
      // height: 100px;
      color: #fff;
      height: 50px;
      background: url('@/assets/index/welfare.png') no-repeat;
      background-size: 100% 100%;
      padding: 25px 24px;
      margin: 0 auto;
    }
    .work-health-service,
    .learning-heart,
    .stay-recreational {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      width: 92%;
      margin: 0 auto;
      margin-top: 14px;
      .card {
        padding: 10px 23px;
        flex: 1;
        margin-right: 5px;
        height: calc(100% - 20px);
      }
      // 安心
      .heart {
        color: #d30015;
        background: url('@/assets/index/heart.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          background: #f24d56;
        }
      }
      .learning {
        color: #0070a2;
        margin-left: 5px;
        background: url('@/assets/index/learning.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          background: #00a4ed;
        }
      }
      .service {
        padding: 0;
        height: 100%;
        color: #0070a2;
        background: url('@/assets/index/service.png') no-repeat;
        background-size: 100% 100%;
        .title {
          margin-left: 23px;
          margin-top: 20px;
        }
        .btn {
          margin-left: 23px;
          background: #0070a2;
        }
      }
      .stay {
        color: #d46f00;
        background: url('@/assets/index/stay.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          background: #ff9043;
        }
      }
      .recreational {
        color: #528878;
        margin-left: 5px;
        background: url('@/assets/index/recreational.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          background: #5bb899;
        }
      }
    }
    .work-health-service {
      height: 140px;
      .health-service {
        padding: 0;
        height: 100%;
        .health {
          color: #528878;
          padding: 10px 23px;
          height: calc(48% - 20px);
          margin-bottom: 2%;
          background: url('@/assets/index/health.png') no-repeat;
          background-size: 100% 100%;
        }
        .work {
          color: #d46f00;
          padding: 12px 23px;
          height: calc(48% - 24px);
          margin-top: 2%;
          background: url('@/assets/index/work.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .stay-recreational {
      margin-bottom: 13px;
    }
    .title {
      width: 81px;
      text-align: center;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .btn {
      color: #fff;
      width: 81px;
      height: 27px;
      line-height: 27px;
      text-align: center;
      background: #ff9776;
      border-radius: 13px;
      font-size: 15px;
      font-weight: bold;
    }
    .swipe-img {
      height: 103px;
      width: 100%;
    }
  }
  .custom-swipe {
    width: 92%;
    margin: 0 auto;
  }
</style>
