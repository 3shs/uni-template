<template>
  <view class="main-page--container">
    <view class="star-capital-title">STAR CAPITAL</view>
    <ScCard
      :title="item.tradeStrategy.type"
      v-for="(item, index) in strategyList"
      :key="index">
        <template #subHeader>
          <TnTag
            :type="item.tradeStrategy.status === 'ENABLE' ? 'success' : 'danger'"
            shape="round">{{ item.tradeStrategy.status === 'ENABLE' ? '启用' : '停用' }}</TnTag>
        </template>
        <template #content>
          <view
            class="sc-card-content-label-value"
            v-for="(ele, i) in getContent(item)"
            :key="i">
            <view class="label">{{ ele.label }}</view>
            <view class="value">{{ ele.value }}</view>
          </view>
        </template>
    </ScCard>
  </view>

</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from "@dcloudio/uni-app"
import { getTradeStrategyList } from "@/api/trade"
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue'
import ScCard from '../../components/ScCard/index.vue'

interface TradeStrategy {
  type: string,
  status: string,
  instId: string,
  posSide: string,
  operateAmount: string,
  updatedTime: string,
  closeCount: number
}
interface Strategy {
  tradeIntervalList: [],
  tradeStrategy: TradeStrategy
}
interface Row {
  tradeStrategy: TradeStrategy
}
const strategyList = ref<Strategy[]>([])
onShow(async ()=> {
  const { data } = await getTradeStrategyList()
  strategyList.value = data
})

const getContent = computed(() => {

  return (row: Row) => {
    return [
      {
        label: '币种',
        value: row.tradeStrategy.instId
      },
      {
        label: '持仓方向',
        value: row.tradeStrategy.posSide === 'short' ? '做空' : '做多'
      },
      {
        label: '开仓金额',
        value: row.tradeStrategy.operateAmount ? row.tradeStrategy.operateAmount : '-'
      },
      {
        label: '更新时间',
        value: row.tradeStrategy.updatedTime
      },
      {
        label: '分批止损次数',
        value: row.tradeStrategy.closeCount
      }
    ]
  }
})

</script>

<style lang="scss" scoped>
.star-capital-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #300A0C;
  margin-bottom: 30rpx;
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
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
  }
}
</style>
