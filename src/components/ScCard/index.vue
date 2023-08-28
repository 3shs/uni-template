<template>
  <view
    class="sc-card">
    <view class="sc-card-title">
      <view class="left">
        {{ title }}
      </view>
      <view class="right">
        <slot name="subHeader"></slot>
      </view>
    </view>
    <view class="sc-card-content">
      <slot name="content"></slot>
    </view>
  </view>
</template>
<script setup lang="ts">
const props = defineProps({
  title: String
})

</script>
<style lang="scss" scoped>
.sc-card {
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0rpx 10rpx 29rpx 3rpx #F1EBEB;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  padding: 53rpx 63rpx 23rpx 37rpx;
  .sc-card-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      font-size: 32rpx;
      font-weight: 500;
      color: #300A0C;
    }
    .right {
      font-size: 28rpx;
      font-weight: 400;
      color: #300A0C;
    }

  }
  .sc-card-content {
    margin-top: 20rpx;
  }
}
</style>
