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
      :title="item.lever + 'x'"
      v-for="(item, index) in leverageList"
      :key="index">
        <template #subHeader>
          <text :class="item.posSide === 'long' ? 'sc-success' : 'sc-danger'">
            {{ item.posSide === 'long' ? '做多' : '做空' }}
          </text>
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
import { getLeverageList } from "@/api/sc-api"
import ScCard from '@/components/ScCard/index.vue'
import ScTitle from '@/components/ScTitle/index.vue'

interface Row {
  instId: string,
  mgnMode: string
}
const accountId = ref('')
const title = ref('')
onLoad((opt) => {
  accountId.value = opt?.id
  title.value = opt?.title
})
onShow(() => {
  getLeverages()
})
const getContent = computed(() => {

return (row: Row) => {
  return [
    {
      label: '币种',
      value: row.instId
    },
    {
      label: '持仓模式',
      value: '逐仓'
    }
  ]
}
})

const leverageList = ref()
const getLeverages = async () => {
  const res = await getLeverageList(accountId.value)
  leverageList.value = res
}

const onClickAdd = () => {
  console.log(111)
  uni.navigateTo({
    url: `/subPages/addLeverage/index?accountId=${accountId.value}`
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
    color: $sc-sub-font-color;
  }
}
</style>
