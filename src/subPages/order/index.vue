<template>
  <view class="main-page--container">
    <view class="order-card-container">
      <view
        class="order-card"
        v-for="(item, index) in orderList"
        @click="onClickOrder(item)">
        <view class="top flex-c-b f-w-500">
          <view class="left">{{ getType(item.strategyType )}}</view>
          <view :class="['right', getClass(item.orderType)]">{{ getOrderType(item.orderType) }}</view>
        </view>
        <view class="bottom">
          <view
            class="sub-itm flex-a-c"
            v-for="(ele, i) in getContent(item)"
            :key="index">
            <view class="label">{{ ele.label }}</view>
            <view class="value">{{ ele.value }}</view>
          </view>
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
  strategyType: string
  orderType: string
  instId: string
  lever: string
  ordId: string
  px: string
  sz: string
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

const getType = computed(() => {
  return (type: string) => {
    if (type === 'CYR') {
      return '波段'
    } else if (type === 'FDM') {
      return '突破'
    } else {
      return '箱体'
    }
  }
})

const getContent = computed(() => {
  return (row: Order) => {
    return [
      {
        label: '币种',
        value: row.instId ? row.instId : '-'
      },
      {
        label: '成交价',
        value: row.px ? row.px : '-'
      },
      {
        label: '订单号',
        value: row.ordId ? row.ordId : '-'
      },
      {
        label: '成交数量',
        value: row.sz ? row.sz : '-'
      }
    ]
  }
})

const onClickOrder = (row: Order) => {
  const info = JSON.stringify(row)
  uni.navigateTo({
    url: `/subPages/orderDetail/index?info=${info}`
  })
}
</script>
<style lang="scss" scoped>
  .order-card-container {
      .order-card {
        width: 100%;
        border-bottom: 1px solid #f3f2f3;
        padding: 20rpx 0;
        .top {
          color: #020202;
          font-size: 30rpx;
          .right {
            color: $sc-btc-color;
          }
        }
        .sub-itm {
          color: $sc-sub-font-color;
          font-size: 24rpx;
          .label {
            width: 118rpx;
          }
        }
      }
  }
</style>
