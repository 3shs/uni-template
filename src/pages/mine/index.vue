<template>
  <view class="main-page--container">
    <view class="property-container">
      <view class="title">总资产估值</view>
      <view class="amount">51.88</view>
    </view>
    <view class="nav-container">
      <view
        class="nav-item"
        v-for="(item, index) in navs"
        :key="index"
        @click="onClickOrder(item.url)">
        <view class="icon">
          <text :class="`iconfont ${item.icon}`"></text>
        </view>
        <view class="name">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Navs {
  name: string,
  icon: string,
  url: string
}
const navs = ref<Navs[]>([
  {
    name: '订单',
    icon: 'icon-dingdan',
    url: '/subPages/order/index'
  }
])
const onClickOrder = (url: string) => {
  uni.navigateTo({
    url
  })
}
</script>
<style lang="scss" scoped>
.property-container {
  margin-top: 20rpx;
  .title {
    color: #3c3c3c;
  }
  .amount {
    color: #020202;
    font-size: 68rpx;
    font-weight: 900;
  }
}
.nav-container {
  display: flex;
  align-items: center;
  margin-top: 40rpx;
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      text {
        font-size: 52rpx;
        color: #030303;
        font-weight: 300;
      }
    }
    .name {
      margin-top: 4rpx;
      color: #030303;
      font-weight: 500;
    }
  }
}
</style>
