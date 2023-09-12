<template>
  <view class="main-page--container">
    <div class="strategy-detail-container">
      <ScTitle title="基本信息" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
      <view class="strategy-base-info-container">
        <view
          class="base-info-item flex-c-b"
          v-for="(item, index) in getContent"
          :key="index">
          <view class="left">{{ item.label }}</view>
          <view class="right">{{ item.value }}</view>
        </view>
      </view>
      <ScTitle title="区间" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
      <ScCard
        :custom-style="{
          boxShadow: 'none',
          border: '1px solid #e6e6e6',
          borderRadius: '15rpx'
        }"
        title="开仓">
        <template #content>
          <view
            class="sc-card-content-label-value flex-c-b"
            v-for="(ele, i) in info.open"
            :key="i">
            <view class="left">
              <view class="interval flex-c-b">
                <view class="label">{{ isFDM ? '开仓价格' : '开仓区间' }}</view>
                <view class="value flex-a-c">
                  <text> <text v-if="isFDM">突破线</text> {{ ele.start }}</text>
                  <text class="line">{{isFDM ? '' : '-'}}</text>
                  <text> <text v-if="isFDM">输入价</text> {{ ele.end }}</text>
                </view>
              </view>
              <view class="pos-side flex-c-b" v-if="isFDM">
                <view class="label">开仓方向</view>
                <view class="value">
                  {{ transformToText(ele.posSide) }}
                </view>
              </view>
            </view>
          </view>
        </template>
      </ScCard>
      <ScCard
        v-if="!isHYM"
        :custom-style="{
          boxShadow: 'none',
          border: '1px solid #e6e6e6',
          borderRadius: '15rpx'
        }"
        title="止盈">
        <template #content>
          <view
            class="sc-card-content-label-value flex-c-b"
            v-for="(ele, i) in info.profit"
            :key="i">
            <view class="left">
              <view class="interval flex-c-b">
                <view class="label">止盈区间</view>
                <view class="value flex-a-c">
                  <text>{{ ele.start }}</text>
                  <text
                    class="line"
                    v-if="!isFDM">-</text>
                  <text>{{ ele.end }}</text>
                </view>
              </view>
              <view class="pos-side flex-c-b" v-if="isFDM">
                <view class="label">止盈方向</view>
                <view class="value">
                  {{ transformToText(ele.posSide) }}
                </view>
              </view>
            </view>
          </view>
        </template>
      </ScCard>
      <ScCard
        :custom-style="{
          boxShadow: 'none',
          border: '1px solid #e6e6e6',
          borderRadius: '15rpx'
        }"
        :title="isFDM ? '止损50%' : '止损'">
        <template #content>
          <view
            class="sc-card-content-label-value flex-c-b"
            v-for="(ele, i) in info.stop"
            :key="i">
            <view class="left">
              <view class="interval flex-c-b">
                <view class="label">{{isHYM ? '止损率' : '止损区间'}}</view>
                <view class="value flex-a-c">
                  <text>{{ ele.start }}</text>
                  <text class="line" v-if="isCYR">-</text>
                  <text>{{ ele.end }}</text>
                </view>
              </view>
              <view class="pos-side flex-c-b">
                <view class="label">止损方向</view>
                <view class="value">
                  {{ transformToText(ele.posSide) }}
                </view>
              </view>
            </view>
          </view>
        </template>
      </ScCard>
      <template v-if="isFDM">
        <ScCard
          :custom-style="{
            boxShadow: 'none',
            border: '1px solid #e6e6e6',
            borderRadius: '15rpx'
          }"
          title="全仓止损">
          <template #content>
            <view
              class="sc-card-content-label-value flex-c-b"
              v-for="(ele, i) in info.fdm"
              :key="i">
              <view class="left">
                <view class="interval flex-c-b">
                  <view class="label">止损区间</view>
                  <view class="value flex-a-c">
                    {{ ele.start }}
                  </view>
                </view>
                <view class="pos-side flex-c-b" v-if="isFDM">
                  <view class="label">止损方向</view>
                  <view class="value">
                    {{ transformToText(ele.posSide) }}
                  </view>
                </view>
              </view>
              <view class="right">
                <TnIcon
                  name="reduce-circle"
                  type="danger"
                  size="40"
                  :custom-style="{
                    marginLeft: '8rpx'
                  }">
                </TnIcon>
              </view>
            </view>
          </template>
        </ScCard>
        <ScCard
          :custom-style="{
            boxShadow: 'none',
            border: '1px solid #e6e6e6',
            borderRadius: '15rpx'
          }"
          title="反手止盈">
          <template #content>
            <view
              class="sc-card-content-label-value flex-c-b"
              v-for="(ele, i) in info.backProfit"
              :key="i">
              <view class="left">
                <view class="interval flex-c-b">
                  <view class="label">止盈区间</view>
                  <view class="value flex-a-c">
                    {{ ele.start }}
                  </view>
                </view>
                <view class="pos-side flex-c-b" v-if="isFDM">
                  <view class="label">止盈方向</view>
                  <view class="value">
                    {{ transformToText(ele.posSide) }}
                  </view>
                </view>
              </view>
            </view>
          </template>
        </ScCard>
        <ScCard
          :custom-style="{
            boxShadow: 'none',
            border: '1px solid #e6e6e6',
            borderRadius: '15rpx'
          }"
          title="反手止损">
          <template #content>
            <view
              class="sc-card-content-label-value flex-c-b"
              v-for="(ele, i) in info.backStop"
              :key="i">
              <view class="left">
                <view class="interval flex-c-b">
                  <view class="label">止损区间</view>
                  <view class="value flex-a-c">
                    {{ ele.start }}
                  </view>
                </view>
                <view class="pos-side flex-c-b" v-if="isFDM">
                  <view class="label">止损方向</view>
                  <view class="value">
                    {{ transformToText(ele.posSide) }}
                  </view>
                </view>
              </view>
            </view>
          </template>
        </ScCard>
      </template>
    </div>
    <view class="save-btn flex-c-b">
      <TnButton
        :bg-color="info.tradeStrategy.status === 'ENABLE' ? '#e6517b' : '#62bc6e'"
        text-color="#ffffff"
        :custom-style="{
          width: '32%',
          height: '88rpx'
        }"
        @click="onClickStatus">{{info.tradeStrategy.status === 'ENABLE' ? '停 用' : '启 用'}}</TnButton>
      <TnButton
        bg-color="#ff4d4f"
        text-color="#ffffff"
        :custom-style="{
          width: '32%',
          height: '88rpx'
        }"
        @click="onClickDelete">删除</TnButton>
      <TnButton
        bg-color="#020202"
        text-color="#ffffff"
        :custom-style="{
          width: '32%',
          height: '88rpx'
        }"
        @click="onClickEdit">修 改</TnButton>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad, onUnload } from "@dcloudio/uni-app"
import ScTitle from '@/components/ScTitle/index.vue'
import ScCard from '../../components/ScCard/index.vue'
import TnButton from "@/uni_modules/tuniaoui/components/button/src/button.vue"
import { createStrategy, deleteStrategy } from "@/api/sc-api"

import { formatEum } from "@/lib/utils"

const transformToText = computed(() => {
  return (type: any) => {
    return formatEum(type)
  }
})

interface Info {
  [key: string]: any
}
const info = ref<Info>({
  tradeStrategy: {},
  backProfit: [],
  backStop: [],
  fdm: [],
  open: [],
  profit: [],
  stop: []
})

const isFDM = computed(() => {
  return info.value.tradeStrategy.type === 'FDM'
})
const isCYR = computed(() => {
  return info.value.tradeStrategy.type === 'CYR'
})
const isHYM = computed(() => {
  return info.value.tradeStrategy.type === 'HYM'
})

const accountId = ref('')
onLoad((opt) => {
  info.value = JSON.parse( opt?.info)
  accountId.value = opt?.accountId
})
let timerId: any

onUnload(() => {
  timerId = null
})
const getContent = computed(() => {
  return [
    {
      label: '策略',
      value: formatEum(info.value.tradeStrategy.type)
    },
    {
      label: '全仓',
      value: info.value.tradeStrategy.allIn === '1' ? '是' : '否'
    },
    {
      label: '开仓金额',
      value: info.value.tradeStrategy.operateAmount ? info.value.tradeStrategy.operateAmount : '-'
    },
    {
      label: '币种',
      value: info.value.tradeStrategy.instId
    },
    {
      label: '持仓方向',
      value: formatEum(info.value.tradeStrategy.posSide)
    },
    {
      label: '状态',
      value: info.value.tradeStrategy.status ===  'ENABLE' ? '启用' : '停用'
    },
    {
      label: '张数比',
      value: info.value.tradeStrategy.rate
    },
    {
      label: '分批止损次数',
      value: info.value.tradeStrategy.closeCount ? info.value.tradeStrategy.closeCount : '-'
    },
    {
      label: 'K线趋势',
      value: info.value.tradeStrategy.k ? info.value.tradeStrategy.k : '-'
    },
    {
      label: '反手开',
      value: info.value.tradeStrategy.back === '1' ? '是' : '否'
    }
  ]
})

const updateStatus = async () => {
  const res = await createStrategy({
    id: info.value.tradeStrategy.id,
    acctId: info.value.tradeStrategy.acctId,
    status: info.value.tradeStrategy.status === 'ENABLE' ? 'UNABLE' : 'ENABLE',
    instId: info.value.tradeStrategy.instId
  }) as any

  if (res) {
    uni.showToast({
      title: '修改成功',
    })
    timerId = setTimeout(() => {
      uni.hideToast()
      uni.navigateBack({
        delta: 1
      })
    }, 1000)
  }
}

const onClickDelete = () => {
  uni.showModal({
    title: '提示',
    content: `确定删除该策略？`,
    confirmColor: '#020202',
    cancelColor: '#e6517b',
    success: function (res) {
      if (res.confirm) {
        deleteOneStrategy()
      }
    }
  })

}
const deleteOneStrategy = async () => {
  const res = await deleteStrategy(info.value.tradeStrategy.id)
  console.log(res)
  if (res) {
    uni.showToast({
      title: '删除成功',
    })
    timerId = setTimeout(() => {
      uni.hideToast()
      uni.navigateBack({
        delta: 1
      })
    }, 1000)
  }
}
const onClickStatus = () => {
  uni.showModal({
    title: '提示',
    content: `确定${info.value.tradeStrategy.status === 'ENABLE' ? '停用' : '启用'}该策略？`,
    confirmColor: '#020202',
    cancelColor: '#e6517b',
    success: function (res) {
      if (res.confirm) {
        updateStatus()
      }
    }
  })
}
const onClickEdit = () => {
  const detail = JSON.stringify(info.value)
  uni.navigateTo({
    url: `/subPages/addStrategy/index?accountId=${accountId.value}&info=${detail}`
  })
}
</script>
<style lang="scss" scoped>
.strategy-detail-container {
  padding-bottom: 88rpx;
}
.strategy-base-info-container {
  margin-bottom: 30rpx;
  .base-info-item {
    padding: 20rpx 0;
    border-bottom: 1px solid $sc-border-color;
    .left {
      font-size: 28rpx;
      font-weight: 500;
      color: $sc-main-font-color;
    }
    .right {
      font-size: 28rpx;
      font-weight: 400;
      color: $sc-sub-font-color;
    }
  }
}
.sc-card-content-label-value {
  padding: 12rpx;
  background-color: #f5f5f5;
  border-radius: 15rpx;
  margin-bottom: 12rpx;
  .left {
    width: 100%;
    .label {
      color: $sc-main-font-color;
    }
    .value {
      color: $sc-sub-font-color;
      .line {
        margin: 0 4rpx;
      }
    }
  }
}
.save-btn {
  padding: 0 30rpx;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 32rpx;
}
</style>
