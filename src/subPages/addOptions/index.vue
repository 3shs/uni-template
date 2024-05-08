<template>
  <view class="main-page--container">
    <view class="add-strategy-cotainer">
      <ScTitle title="基本信息" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
      <TnForm
        :model="formData"
        ref="formRef"
        label-position="top"
        :rules="formRules"
      >
        <TnFormItem label="策略" prop="type">
          <TnRadioGroup
            v-model="formData.type"
            border
            active-color="#020202">
            <TnRadio label="OPT_FIGHT">期权</TnRadio>
          </TnRadioGroup>
        </TnFormItem>
        <TnFormItem label="币种" prop="instId">
          <TnRadioGroup
            v-model="formData.instId"
            border
            @change="onChangeCurrency"
            active-color="#020202">
            <TnRadio label="BTC-USD">BTC-USD</TnRadio>
            <TnRadio label="ETH-USD">ETH-USD</TnRadio>
          </TnRadioGroup>
        </TnFormItem>
        <TnFormItem
          label="操作金额"
          prop="operateAmount">
          <TnInput
            class="options-amout-input"
            v-model="formData.operateAmount"
            placeholder="请输入操作金额">
            <template #suffix>
              {{ balance }}
            </template>
          </TnInput>
        </TnFormItem>
        <!-- <TnFormItem label="状态" prop="status">
          <TnRadioGroup
            v-model="formData.status"
            border>
            <TnRadio label="ENABLE" active-color="#62bc6e">启用</TnRadio>
            <TnRadio label="UNABLE" active-color="#e6517b">停用</TnRadio>
          </TnRadioGroup>
        </TnFormItem> -->
      </TnForm>
    </view>
    <view class="options-left-right-container">
      <ScTitle title="行权价" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
      <view class="left-mid-right-container">
        <view class="top-title-container flex">
          <view class="left-title flex-j-c sc-success">看涨</view>
          <view class="mid-title"></view>
          <view class="right-title flex-j-c sc-danger">看跌</view>
        </view>
        <view class="bottom-item-list-container flex">
          <view class="left-item">
            <view class="left-item-title main-item-title flex-j-c">行权价</view>
            <view class="item-list-wrap">
              <view
                class="item-list"
                v-for="(item, index) in procductionsRise"
                :key="index"
                @click="onClickOptions(item)">
                {{ item.instId }}
                <text
                  v-if="item.instId === formData.openInstId"
                  class="iconfont icon-jiaobiaoxuanzhong checked">
                </text>
              </view>
            </view>
          </view>
          <view class="mid-item">
            <view class="mid-item-title main-item-title flex-j-c">执行价格</view>
            <view class="item-list-wrap">
              <view
                class="item-list flex-j-c mid-price-item"
                v-for="(item, index) in procductionsRise"
                :key="index">
                {{ item.price }}
              </view>
            </view>
          </view>
          <view class="right-item">
            <view class="right-item-title main-item-title flex-j-c">行权价</view>
            <view class="item-list-wrap">
              <view
                class="item-list"
                v-for="(item, index) in procductionsFall"
                :key="index"
                @click="onClickOptions(item)">
                {{ item.instId }}
                <text
                  v-if="item.instId === formData.openInstId"
                  class="iconfont icon-jiaobiaoxuanzhong checked">
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="interval-container">
      <ScTitle title="区间" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
      <ScCard
        :custom-style="{
          boxShadow: 'none',
          border: '1px solid #e6e6e6',
          borderRadius: '15rpx'
        }"
        title="开仓">
        <template #subHeader>
          <text
            class="iconfont icon-zengjia1 default"
            @click="onClickAdd('OPEN')">
          </text>
        </template>
        <template #content>
          <view
            class="sc-card-content-label-value flex-c-b"
            v-for="(ele, i) in intervalForm.open"
            :key="i">
            <view class="left">
              <view class="interval flex-c-b m-b-5">
                <view class="label">触发价</view>
                <view class="value flex-a-c">
                  <TnInput
                    size="sm"
                    v-model="ele.start"
                    placeholder="请输入"
                    :custom-style="{
                      width: '360rpx'
                    }">
                  </TnInput>
                </view>
              </view>
              <view class="interval flex-c-b">
                <view class="label">最高价</view>
                <view class="value flex-a-c">
                  <TnInput
                    size="sm"
                    v-model="ele.end"
                    placeholder="请输入"
                    :custom-style="{
                      width: '360rpx'
                    }">
                  </TnInput>
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
                }"
                @click="onClickRmove('open', i)">
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
        title="止盈">
        <template #subHeader>
          <text
            class="iconfont icon-zengjia1 sc-success"
            @click="onClickAdd('PROFIT')">
          </text>
        </template>
        <template #content>
          <view
            class="sc-card-content-label-value flex-c-b"
            v-for="(ele, i) in intervalForm.profit"
            :key="i">
            <view class="left">
              <view class="interval flex-c-b">
                <view class="label">止盈区间</view>
                <view class="value flex-a-c">
                  <TnInput
                    size="sm"
                    v-model="ele.start"
                    placeholder="请输入"
                    :custom-style="{
                      width: '180rpx'
                    }">
                  </TnInput>
                  <text
                    class="line">-</text>
                  <TnInput
                    size="sm"
                    v-model="ele.end"
                    placeholder="请输入"
                    :custom-style="{
                      width: '180rpx'
                    }">
                  </TnInput>
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
                }"
                @click="onClickRmove('profit', i)">
              </TnIcon>
            </view>
          </view>
        </template>
      </ScCard>
    </view>
    <view class="save-btn">
      <TnButton
        bg-color="#020202"
        text-color="#ffffff"
        :custom-style="{
          width: '100%',
          height: '88rpx'
        }"
        @click="onClickSave">保 存</TnButton>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onShow, onLoad, onUnload } from "@dcloudio/uni-app"
import { getCurrencyList, getAccountBalance, createStrategy, createInterval, getProduct } from "@/api/sc-api"
import ScCard from '../../components/ScCard/index.vue'
import ScTitle from '@/components/ScTitle/index.vue'
import TnForm from '@/uni_modules/tuniaoui/components/form/src/form.vue'
import TnFormItem from '@/uni_modules/tuniaoui/components/form/src/form-item.vue'
import TnInput from '@/uni_modules/tuniaoui/components/input/src/input.vue'
import TnRadioGroup from '@/uni_modules/tuniaoui/components/radio/src/radio-group.vue'
import TnRadio from '@/uni_modules/tuniaoui/components/radio/src/radio.vue'
import TnIcon from '@/uni_modules/tuniaoui/components/icon/src/icon.vue'
import TnButton from "@/uni_modules/tuniaoui/components/button/src/button.vue"
import type { FormRules, TnFormInstance } from '@/uni_modules/tuniaoui'
import { debounce } from "@/lib/utils"
const formRef = ref<TnFormInstance>()
const formRules: FormRules = {
  type: [
    { required: true, message: '请选择策略', trigger: ['blur', 'change'] },
  ],
  operateAmount: [
    { required: true, message: '请输入操作金额', trigger: ['blur', 'change'] },
  ],
  instId: [
    { required: true, message: '请选择币种', trigger: ['blur', 'change'] },
  ]
}


interface IntervalForm {
  [key: string]: any
}
interface EumType {
  [key: string]: string
}

const accountId = ref<string>('')
onLoad((opt) => {
  accountId.value = opt?.accountId
  formData.acctId = opt?.accountId
  if (opt?.info) {
    assignFormData(JSON.parse(opt.info))
  } else {
    formData.id = ''
  }
})
let timerId: any

onUnload(() => {
  timerId = null
})
onShow(() => {
  getOperateAmount()
  getCurrencys()
  getProduction()
})
const formData = reactive({
  id: '',
  instType: 'OPTION',
  type: 'OPT_FIGHT',
  instId: 'BTC-USD',
  status: 'UNABLE',
  operateAmount: '',
  acctId: '',
  openInstId: ''
})

const intervalForm = reactive<IntervalForm>({
  tradeStrategyId: '',
  open: [
    {
      type: 'OPEN',
      start: '',
      end: '',
      posSide: '',
    }
  ],
  profit: [
    {
      type: 'PROFIT',
      start: '',
      end: '',
      posSide: '',
    }
  ]
})

const currencyList = ref([])
const getCurrencys = async () => {
  const data = await getCurrencyList(accountId.value) as any
  currencyList.value = data
}

const balance = ref('')
const getOperateAmount = async () => {
  const target = formData.instId.split('-')[0]
  const data = await getAccountBalance(accountId.value, target) as any
  balance.value = data
}

const eumType: EumType = {
  OPEN: 'open',
  PROFIT: 'profit',
  STOP: 'stop',
  BACK_PROFIT: 'backProfit',
  BACK_STOP: 'backStop',
  FDM: 'fdm'
}
const onClickAdd = (type: string) => {
  const data = {
    type,
    start: '',
    end: '',
    posSide: ''
  }
  intervalForm[eumType[type]].push(JSON.parse(JSON.stringify(data)))
}

const onClickRmove = (type: string, index: number) => {
  uni.showModal({
    title: '提示',
    content: '确定删除本条数据？',
    confirmColor: '#020202',
    cancelColor: '#e6517b',
    success: function (res) {
      if (res.confirm) {
        intervalForm[type].splice(index, 1)
      }
    }
  })
}

const assignFormData = (data: any) => {
  formData.id = data.tradeStrategy.id
  formData.instId = data.tradeStrategy.instId
  formData.status = data.tradeStrategy.status
  formData.operateAmount = data.tradeStrategy.operateAmount
  formData.openInstId = data.tradeStrategy.openInstId
  formData.type = 'OPT_FIGHT'
  formData.instType = 'OPTION'
  intervalForm.open = data.open
  intervalForm.profit = data.profit
}


const onChangeCurrency = () => {
  getOperateAmount()
  getProduction()
}

const onClickSave = debounce(async() => {
  await formRef.value?.validate()
  if (!formData.openInstId) {
    uni.showToast({
      icon: 'error',
      title: '执行价位必选！！！',
    })
    return
  }
  const res = await createStrategy(formData) as any
  if(!res) return
  intervalForm.tradeStrategyId = res
  const resp = await createInterval(intervalForm) as any
  if (resp === 'S') {
    uni.showToast({
      title: '保存成功',
    })
    timerId = setTimeout(() => {
      uni.hideToast()
      uni.navigateBack({
        delta: 1
      })
    }, 1000)
  }
}, 1000, true)


const procductionsRise = ref<any[]>([])
const procductionsFall = ref<any[]>([])
const getProduction = async () => {
  const data = await getProduct(accountId.value, formData.instId) as any
  procductionsRise.value = data.optionTicketC
  procductionsFall.value = data.optionTicketP
}

const onClickOptions = (row: any) => {
  formData.openInstId = row.instId
}

</script>
<style lang="scss" scoped>
.default {
  color: $sc-main-font-color;
}
.iconfont {
  font-size: 42rpx;
  font-weight: 500;
}
.sc-card-content-label-value {
  padding: 12rpx;
  background-color: #f5f5f5;
  border-radius: 15rpx;
  margin-bottom: 12rpx;
  .left {
    flex: 1;
  }
  .right {
    width: 48rpx;
  }
  .lable {
    font-size: 28rpx;
    color: #300A0C;
  }
  .value {
    justify-content: flex-end;
    .line {
      margin: 0 4rpx;
    }
  }
}
.fdm-tip {
  color: $sc-sub-font-color;
  font-size: 22rpx;
  justify-content: flex-end;
  .tip-right {
    margin-left: 90rpx;
    margin-right: 66rpx;
  }
}
.options-left-right-container {
  margin-bottom: 15px;
}
.top-title-container {
  background-color: $sc-sub-bg-color;
  .left-title {
    width: 40%;
  }
  .mid-title {
    width: 20%;
  }
  .right-title {
    width: 40%;
  }
}
.bottom-item-list-container {
  .left-item {
    width: 42%;
  }
  .mid-item {
    width: 16%;
  }
  .right-item {
    width: 42%;
  }

  .main-item-title {
    background-color: $sc-sub-bg-color;
  }
  .item-list {
    position: relative;
    height: 70rpx;
    padding: 20rpx 10rpx;
    font-size: 20rpx;
    border-top: 1px solid $sc-border-color;
    &:last-child {
      border-bottom: 1px solid $sc-border-color;
    }
    .checked {
      font-size: 56rpx;
      position: absolute;
      right: -8rpx;
      bottom: -12rpx;
      color: $sc-btc-color;
    }
  }
  .mid-price-item {
    background-color: $sc-sub-bg-color;
    border: none;
    &:last-child {
      border: none;
    }
  }
  .mid-item-title {
    color: #929292;
  }
}
</style>
