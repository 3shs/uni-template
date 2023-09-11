<template>
  <view
    class="star-capital-title flex-a-c"
    :style="customStyle">
    <text class="iconfont icon-bitcoin btc-icon"></text>
    {{ title }}
  </view>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'STAR CAPITAL'
  },
  customStyle: Object
})
</script>
<style lang="scss" scoped>
.star-capital-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #300A0C;
  position: relative;
  .btc-icon {
    color: $sc-btc-color;
    font-size: 46rpx;
    margin-right: 6rpx;
  }
}
</style>

