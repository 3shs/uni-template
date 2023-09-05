<template>
  <view class="main-page--container">
    <view class="sc-strategy-title flex-c-b">
      <view class="left">
        <ScTitle :title="title"></ScTitle>
      </view>
      <view class="right" @click="onClickAdd">
        <text class="iconfont icon-zengjia1"></text>
      </view>
    </view>
    <ScCard
      :title="formatTitle(item.tradeStrategy.type)"
      v-for="(item, index) in strategyList"
      :key="index"
      @click="onclickRow(item)">
        <template #subHeader>
          <TnTag
            :type="item.tradeStrategy.status === 'ENABLE' ? 'success' : 'danger'"
            :bg-color="`${item.tradeStrategy.status === 'ENABLE' ? '#62bc6e' : '#e6517b'}`"
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
import { onShow, onLoad } from "@dcloudio/uni-app"
import { getTradeStrategyList } from "@/api/sc-api"
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue'
import ScCard from '@/components/ScCard/index.vue'
import ScTitle from '@/components/ScTitle/index.vue'
import { formatEum } from "@/lib/utils"

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

const accountId = ref('')
const title = ref('')

onLoad((opt) => {
  accountId.value = opt?.id
  title.value = opt?.title
})

const strategyList = ref<Strategy[]>([])
onShow(async ()=> {
  const data = await getTradeStrategyList({acctId: accountId.value}) as any
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
        value: formatEum(row.tradeStrategy.posSide as any)
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
        value: row.tradeStrategy.closeCount ? row.tradeStrategy.closeCount : '-'
      }
    ]
  }
})

const formatTitle = computed(() => {
  return (type: string) => {
    if (type === 'CYR') {
      return '波段'
    } else if (type === 'FDM') {
      return '突破'
    } else if (type === 'HYM') {
      return '箱体'
    }
  }
})

const onClickAdd = () => {
  uni.navigateTo({
    url: `/subPages/addStrategy/index?accountId=${accountId.value}`
  })
}

const onclickRow = (row: Strategy) => {
  console.log(row)
  const info = JSON.stringify(row)
  uni.navigateTo({
    url: `/subPages/strategyDetail/index?accountId=${accountId.value}&info=${info}`
  })
}

</script>

<style lang="scss" scoped>
.sc-strategy-title {
  margin-bottom: 30rpx;
  .right {
    .iconfont {
      color: $sc-main-font-color;
      font-size: 46rpx;
    }
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
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
  }
}
</style>
