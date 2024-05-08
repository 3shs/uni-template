<template>
  <view class="main-page--container">
    <view class="sc-account-menu-container">
      <view
        class="sc-account-menu-item"
        v-for="(item, index) in menus"
        :key="index"
        @click="onClickMenuItem(item)">
        <view class="icon">
          <text :class="`iconfont' ${item.icon}`"></text>
        </view>
        <view class="name f-w-500">{{ item.title }}</view>
      </view>
    </view>
    <view class="account-name sc-rich f-w-800 flex-j-c m-t-10">{{ title }}</view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onShow, onLoad } from "@dcloudio/uni-app"

interface Row {
  icon: string
  title: string
  url: string
}

const menus = ref([
  {
    icon: 'icon-percenttage',
    title: '杠杆',
    url: '/subPages/leverage/index'
  },
  {
    icon: 'icon-jiqiren',
    title: '策略',
    url: '/subPages/strategy/index'
  },
  {
    icon: 'icon-level',
    title: '期权',
    url: '/subPages/strategy/index'
  }
])
const accountId = ref('')
const title = ref('')

onLoad((opt) => {
  accountId.value = opt?.id
  title.value = opt?.title
})

const onClickMenuItem = (row: Row) => {
  const from = row.title === '策略' ? 'strategy' : 'options'
  uni.navigateTo({
    url: `${row.url}?id=${accountId.value}&title=${title.value}&from=${from}`
  })
}
</script>
<style lang="scss" scoped>
.sc-account-menu-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  border: 1px solid $sc-border-color;
  border-radius: 15rpx;
  .sc-account-menu-item {
    text-align: center;
    border-right: 1px solid $sc-border-color;
    padding: 20rpx 0;
    .icon {
      height: 66rpx;
    }
    .iconfont {
      font-size: 50rpx;
    }
    .icon-jiqiren {
      font-size: 58rpx;
    }
  }
}
</style>
