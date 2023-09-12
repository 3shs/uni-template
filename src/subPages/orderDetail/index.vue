<template>
  <view class="main-page--container">
    <ScTitle title="基本信息" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
    <ScCard
      :title="getType(info.strategyType )">
      <template #subHeader>
        <view :class="['right', getClass(info.orderType)]">{{ getOrderType(info.orderType) }}</view>
      </template>
      <template #content>
        <view
          class="sc-card-content-label-value"
          v-for="(ele, i) in getContent"
          :key="i">
          <view class="label">{{ ele.label }}</view>
          <view class="value">{{ ele.value }}</view>
        </view>
      </template>
    </ScCard>
    <template v-if="info.details && info.details.length > 0">
      <ScTitle title="关联信息" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
      <ScCard
        :title="getType(item.strategyType )"
        v-for="(item, index) in info.details"
        :key="index">
        <template #subHeader>
          <view :class="['right', getClass(item.orderType)]">{{ getOrderType(item.orderType) }}</view>
        </template>
        <template #content>
          <view
            class="sc-card-content-label-value"
            v-for="(ele, i) in getRelatContent(item)"
            :key="i">
            <view class="label">{{ ele.label }}</view>
            <view class="value">{{ ele.value }}</view>
          </view>
        </template>
      </ScCard>
    </template>
    <template v-if="information">
      <ScTitle title="仓位信息" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
      <ScCard
        :title="information.pnl.slice(0, 8)"
        :custom-main-title-style="{
          color: information.pnl.includes('-') ? '#e6517b' : '#62bc6e'
        }">
        <template #subHeader>
          <view :class="['right', getInformationClass(information.pnlRatio)]">{{ information.pnlRatio.slice(0, 8) }}</view>
        </template>
        <template #content>
          <view
            class="sc-card-content-label-value"
            v-for="(ele, i) in getInfomationContent"
            :key="i">
            <view class="label">{{ ele.label }}</view>
            <view class="value">{{ ele.value }}</view>
          </view>
        </template>
      </ScCard>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getOrderDetail } from '@/api/sc-api'
import ScCard from '../../components/ScCard/index.vue'
import ScTitle from '../../components/ScTitle/index.vue'

interface Info {
  strategyType: string,
  orderType: string,
  fee: string,
  instId: string,
  lever: string,
  ordId: string,
  ordType: string,
  posSide: string,
  px: string,
  side: string,
  sz: string,
  orderState: string,
  closeCount: string,
  markPrice: string,
  createTime: string,
  updateTime: string,
  details: Info[]
}

const info = ref<Info>({
  strategyType: '',
  orderType: '',
  fee: '',
  instId: '',
  lever: '',
  ordId: '',
  ordType: '',
  posSide: '',
  px: '',
  side: '',
  sz: '',
  orderState: '',
  closeCount: '',
  markPrice: '',
  createTime: '',
  updateTime: '',
  details: []
})
interface Information {
  ctime: string
  ccy: string
  closeAvgPx: string
  closeTotalPos: string
  instId: string
  lever: string
  openAvgPx: string
  openMaxPos: string
  fee: string
  pnl: string
  pnlRatio: string
  posId: string
  direction: string
  utime: string
}
const information = ref<Information>({
  ctime: '',
  ccy: '',
  closeAvgPx: '',
  closeTotalPos: '',
  instId: '',
  lever: '',
  openAvgPx: '',
  openMaxPos: '',
  fee: '',
  pnl: '',
  pnlRatio: '',
  posId: '',
  direction: '',
  utime: '',
})
onLoad((opt) => {
  info.value = JSON.parse(opt?.info)
})

const getDetail = async () => {
  const res = await getOrderDetail(info.value.ordId) as any
  info.value.details = res.details
  information.value = res.tradePositionsHistory
}
onShow(() => {
  getDetail()
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

const getClass = computed(() => {
  return (type: string) => {
    if (type === 'PROFIT') {
      return 'sc-success'
    } else if (type === 'STOP') {
      return 'sc-danger'
    }
  }
})

const getInformationClass = computed(() => {
  return (type: string) => {
    if (type.includes('-')) {
      return 'sc-danger'
    } else {
      return 'sc-success'
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

const getContent = computed(() => {
  return [
    {
      label: '费用',
      value: info.value.fee ? info.value.fee : '-'
    },
    {
      label: '币种',
      value: info.value.instId
    },
    {
      label: '杠杆',
      value: info.value.lever + 'x'
    },
    {
      label: '订单号',
      value: info.value.ordId
    },
    {
      label: '限价单',
      value: info.value.ordType
    },
    {
      label: '持仓方向',
      value: info.value.posSide === 'long' ? '做多' : '做空'
    },
    {
      label: '成交价',
      value: info.value.px
    },
    {
      label: '卖出',
      value: info.value.side
    },
    {
      label: '成交数量',
      value: info.value.sz
    },
    {
      label: '持仓模式',
      value: '逐仓'
    },
    {
      label: '订单状态',
      value: info.value.orderState === 'ING' ? '持仓' : '已关闭'
    },
    {
      label: '分批止损次数',
      value: info.value.closeCount
    },
    {
      label: '市价',
      value: info.value.markPrice
    },
    {
      label: '创建时间',
      value: info.value.createTime
    },
    {
      label: '更新时间',
      value: info.value.updateTime
    }
  ]
})

const getRelatContent = computed(() => {
  return (row: Info) => {
    return [
      {
        label: '费用',
        value: row.fee ? row.fee : '-'
      },
      {
        label: '币种',
        value: row.instId
      },
      {
        label: '杠杆',
        value: row.lever + 'x'
      },
      {
        label: '订单号',
        value: row.ordId
      },
      {
        label: '限价单',
        value: row.ordType
      },
      {
        label: '持仓方向',
        value: row.posSide === 'long' ? '做多' : '做空'
      },
      {
        label: '成交价',
        value: row.px
      },
      {
        label: '卖出',
        value: row.side
      },
      {
        label: '成交数量',
        value: row.sz
      },
      {
        label: '持仓模式',
        value: '逐仓'
      },
      {
        label: '订单状态',
        value: row.orderState === 'ING' ? '持仓' : '已关闭'
      },
      {
        label: '分批止损次数',
        value: row.closeCount
      },
      {
        label: '市价',
        value: row.markPrice
      },
      {
        label: '创建时间',
        value: row.createTime
      },
      {
        label: '更新时间',
        value: row.updateTime
      }
    ]
  }
})

const getInfomationContent = computed(() => {
  return [
    {
      label: '平仓均价',
      value: information.value.closeAvgPx
    },
    {
      label: '平仓数量',
      value: information.value.closeTotalPos
    },
    {
      label: '币种',
      value: information.value.instId
    },
    {
      label: '杠杆',
      value: information.value.lever
    },
    {
      label: '开仓均价',
      value: information.value.openAvgPx
    },
    {
      label: '开仓数量',
      value: information.value.openMaxPos
    },
    {
      label: '手续费',
      value: information.value.fee
    },
    {
      label: '持仓方向',
      value: information.value.direction === 'long' ? '做多' : '做空'
    },
    {
      label: '开仓时间',
      value: information.value.ctime
    },
    {
      label: '平仓时间',
      value: information.value.utime
    },
  ]
})
</script>
<style lang="scss" scoped>
.sc-card-content-label-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .lable {
    font-size: 28rpx;
    font-weight: 500;
    color: #300A0C;
  }
  .value {
    font-size: 24rpx;
    font-weight: 400;
    color: $sc-sub-font-color
  }
}
</style>
