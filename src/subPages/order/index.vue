<template>
  <view class="main-page--container">
    <view class="order-card-container">
      <view
        class="order-card"
        v-for="(item, index) in orderList">
        <view class="top flex-c-b f-w-500">
          <view class="left">{{ item.strategyType }}</view>
          <view :class="['right', getClass(item.orderType)]">{{ getOrderType(item.orderType) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app"
import { ref, computed } from 'vue'
import { getOrderList } from '@/api/sc-api'

interface Order {
  strategyType: string,
  orderType: string
}

const orderList = ref<Order[]>([])

onShow(() => {
  getOrders()
})

const getOrders = async () => {
  const { records } = await getOrderList() as any
  orderList.value = records
}

const getClass = computed(() => {
  return (type: string) => {
    if (type === 'PROFIT') {
      return 'sc-success'
    } else if (type === 'STOP') {
      return 'sc-danger'
    }
  }
})

const getOrderType = computed(() => {
  return (type: string) => {
    if (type === 'OPEN') {
      return '开仓'
    } else if (type === 'PROFIT') {
      return '止盈'
    } else {
      return '止损'
    }
  }
})

</script>
<style lang="scss" scoped>
  .order-card-container {
      .order-card {
        width: 100%;
        border-bottom: 1px solid #f3f2f3;
        padding: 40rpx 0;
        .top {
          color: #020202;
          font-size: 30rpx;
        }
      }
  }
</style>
