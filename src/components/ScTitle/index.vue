<template>
  <view
    class="star-capital-title"
    :style="customStyle">{{ title }}</view>
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
  &::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 0px;
    width: 30rpx;
    height: 30rpx;
    background: #FFC1C4;
    border-radius: 50%;
    opacity: 0.5;
  }
}
</style>

