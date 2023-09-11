<template>

<view class="main-page--container">
  <view class="welcome f-w-600">WELCOME</view>
  <view class="star f-w-400">STAR</view>
  <view class="capital f-w-400">CAPITAL</view>
</view>
</template>
<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app"
import { scLogin } from "@/api/sc-api"

const login = async (code: string) => {
  const res = await scLogin(code)
  uni.setStorageSync('token', res)
  uni.switchTab({
    url: '/pages/index/index'
  })
}
onShow(() => {
  const token = uni.getStorageSync('token')
  if (!token) {
    uni.login({
      provider: 'weixin',
      success(res) {
        login(res.code)
      }
    })
  } else {
    uni.switchTab({
      url: '/pages/index/index'
    })
  }
})
</script>
<style lang="scss" scoped>
.welcome {
  font-size: 90rpx;
  color: $sc-main-font-color;
  animation: welcome 3s ease-in-out;
}
.star {
  font-size: 60rpx;
  color: $sc-btc-color;
  animation: welcome 5s ease-in-out;
}
.capital {
  font-size: 60rpx;
  animation: welcome 8s ease-in-out;
}

@keyframes welcome {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
