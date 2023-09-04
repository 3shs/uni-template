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
            active-color="#020202"
            @change="(onChangeType as any)">
            <TnRadio label="CYR">波段</TnRadio>
            <TnRadio label="FDM">突破</TnRadio>
            <TnRadio label="HYM">箱体</TnRadio>
          </TnRadioGroup>
        </TnFormItem>
        <TnFormItem
          label="操作金额"
          prop="operateAmount">
          <TnInput
            v-model="formData.operateAmount"
            placeholder="请输入操作金额">
            <template #suffix>
              {{ balance }}
            </template>
          </TnInput>
        </TnFormItem>
        <TnFormItem label="币种" prop="instId">
          <TnInput
            v-model="formData.instId"
            type="select"
            @click="onClickCurrency"
            placeholder="请选择币种">
          </TnInput>
        </TnFormItem>
        <TnFormItem label="持仓方向" prop="posSide">
          <TnRadioGroup
            v-model="formData.posSide"
            border>
            <TnRadio label="long" active-color="#62bc6e">做多</TnRadio>
            <TnRadio label="short" active-color="#e6517b">做空</TnRadio>
            <TnRadio
              label="long,short"
              active-color="#020202"
              v-if="isHYM">多空双开
            </TnRadio>
          </TnRadioGroup>
        </TnFormItem>
        <TnFormItem label="状态" prop="status">
          <TnRadioGroup
            v-model="formData.status"
            border>
            <TnRadio label="ENABLE" active-color="#62bc6e">启用</TnRadio>
            <TnRadio label="UNABLE" active-color="#e6517b">停用</TnRadio>
          </TnRadioGroup>
        </TnFormItem>
        <TnFormItem
          label="张数比"
          prop="rate">
          <TnInput
            v-model.trim="formData.rate"
            placeholder="请输入张数比">
          </TnInput>
        </TnFormItem>
        <TnFormItem
          label="分批止损次数"
          prop="closeCount"
          v-if="isCYR || isFDM">
          <TnInput
            v-model.trim="formData.closeCount"
            placeholder="请输入分批止损次数">
          </TnInput>
        </TnFormItem>
        <TnFormItem
          label="K线趋势"
          prop="k"
          v-if="isFDM">
          <TnInput
            v-model="formData.k"
            type="select"
            @click="onClickKline"
            placeholder="请选择K线趋势">
          </TnInput>
        </TnFormItem>
        <TnFormItem
          label="反手开"
          prop="back"
          v-if="isFDM">
          <TnRadioGroup
            v-model="formData.back"
            border>
            <TnRadio label="1" active-color="#62bc6e">是</TnRadio>
            <TnRadio label="0" active-color="#e6517b">否</TnRadio>
          </TnRadioGroup>
        </TnFormItem>
      </TnForm>
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
              <view class="interval flex-c-b">
                <view class="label">开仓区间</view>
                <view class="value flex-a-c">
                  <TnInput
                    size="sm"
                    v-model="ele.start"
                    :placeholder="`${isFDM ? `突破价格` : isHYM ? `下沿价格数值` : `请输入`}`"
                    :custom-style="{
                      width: '180rpx'
                    }">
                  </TnInput>
                  <text class="line">-</text>
                  <TnInput
                    size="sm"
                    v-model="ele.end"
                    :placeholder="`${isFDM ? `手动输入价格` : isHYM ? `上沿价格数值` : `请输入`}`"
                    :custom-style="{
                      width: '180rpx'
                    }">
                  </TnInput>
                </view>
              </view>
              <view class="pos-side flex-c-b" v-if="isFDM">
                <view class="label">开仓方向</view>
                <view class="value">
                  <TnRadioGroup
                    v-model="ele.posSide">
                    <TnRadio label="long" active-color="#62bc6e">做多</TnRadio>
                    <TnRadio
                      label="short"
                      active-color="#e6517b"
                      :custom-style="{marginRight: '0'}">做空</TnRadio>
                  </TnRadioGroup>
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
        v-if="!isHYM"
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
                    :placeholder="`${isFDM ? `手动输入价格` : `请输入`}`"
                    :custom-style="{
                      width: '180rpx'
                    }">
                  </TnInput>
                  <text
                    class="line"
                    v-if="!isFDM">-</text>
                  <TnInput
                    size="sm"
                    v-model="ele.end"
                    placeholder="请输入"
                    v-if="!isFDM"
                    :custom-style="{
                      width: '180rpx'
                    }">
                  </TnInput>
                </view>
              </view>
              <view class="pos-side flex-c-b" v-if="isFDM">
                <view class="label">止盈方向</view>
                <view class="value">
                  <TnRadioGroup
                    v-model="ele.posSide">
                    <TnRadio label="long" active-color="#62bc6e">做多</TnRadio>
                    <TnRadio
                      label="short"
                      active-color="#e6517b"
                      :custom-style="{marginRight: '0'}">做空</TnRadio>
                  </TnRadioGroup>
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
      <ScCard
        :custom-style="{
          boxShadow: 'none',
          border: '1px solid #e6e6e6',
          borderRadius: '15rpx'
        }"
        title="止损">
        <template #subHeader>
          <text
            class="iconfont icon-zengjia1 sc-danger"
            @click="onClickAdd('STOP')">
          </text>
        </template>
        <template #content>
          <view
            class="sc-card-content-label-value flex-c-b"
            v-for="(ele, i) in intervalForm.stop"
            :key="i">
            <view class="left">
              <view class="interval flex-c-b">
                <view class="label">{{isHYM ? '止损率' : '止损区间'}}</view>
                <view class="value flex-a-c">
                  <TnInput
                    size="sm"
                    v-model="ele.start"
                    :placeholder="`${isFDM ? `手动输入价格` : `请输入`}`"
                    :custom-style="{
                      width: '180rpx'
                    }">
                  </TnInput>
                  <text class="line" v-if="isCYR">-</text>
                  <TnInput
                    size="sm"
                    v-model="ele.end"
                    v-if="isCYR"
                    placeholder="请输入"
                    :custom-style="{
                      width: '180rpx'
                    }">
                  </TnInput>
                </view>
              </view>
              <view class="pos-side flex-c-b">
                <view class="label">止损方向</view>
                <view class="value">
                  <TnRadioGroup
                    v-model="ele.posSide">
                    <TnRadio label="long" active-color="#62bc6e">做多</TnRadio>
                    <TnRadio
                      label="short"
                      active-color="#e6517b"
                      :custom-style="{marginRight: '0'}">做空</TnRadio>
                  </TnRadioGroup>
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
                @click="onClickRmove('stop', i)">
              </TnIcon>
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
          title="反手止盈">
          <template #subHeader>
            <text
              class="iconfont icon-zengjia1 sc-success"
              @click="onClickAdd('BACK_PROFIT')">
            </text>
          </template>
          <template #content>
            <view
              class="sc-card-content-label-value flex-c-b"
              v-for="(ele, i) in intervalForm.backProfit"
              :key="i">
              <view class="left">
                <view class="interval flex-c-b">
                  <view class="label">止盈区间</view>
                  <view class="value flex-a-c">
                    <TnInput
                      size="sm"
                      v-model="ele.start"
                      :placeholder="`${isFDM ? `手动输入价格` : `请输入`}`"
                      :custom-style="{
                        width: '180rpx'
                      }">
                    </TnInput>
                    <text
                      class="line"
                      v-if="!isFDM">-</text>
                    <TnInput
                      size="sm"
                      v-model="ele.end"
                      placeholder="请输入"
                      v-if="!isFDM"
                      :custom-style="{
                        width: '180rpx'
                      }">
                    </TnInput>
                  </view>
                </view>
                <view class="pos-side flex-c-b" v-if="isFDM">
                  <view class="label">止盈方向</view>
                  <view class="value">
                    <TnRadioGroup
                      v-model="ele.posSide">
                      <TnRadio label="long" active-color="#62bc6e">做多</TnRadio>
                      <TnRadio
                        label="short"
                        active-color="#e6517b"
                        :custom-style="{marginRight: '0'}">做空</TnRadio>
                    </TnRadioGroup>
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
                  @click="onClickRmove('backProfit', i)">
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
          title="反手止损">
          <template #subHeader>
            <text
              class="iconfont icon-zengjia1 sc-danger"
              @click="onClickAdd('BACK_STOP')">
            </text>
          </template>
          <template #content>
            <view
              class="sc-card-content-label-value flex-c-b"
              v-for="(ele, i) in intervalForm.backStop"
              :key="i">
              <view class="left">
                <view class="interval flex-c-b">
                  <view class="label">止损区间</view>
                  <view class="value flex-a-c">
                    <TnInput
                      size="sm"
                      v-model="ele.start"
                      :placeholder="`${isFDM ? `手动输入价格` : `请输入`}`"
                      :custom-style="{
                        width: '180rpx'
                      }">
                    </TnInput>
                    <text
                      class="line"
                      v-if="!isFDM">-</text>
                    <TnInput
                      size="sm"
                      v-model="ele.end"
                      placeholder="请输入"
                      v-if="!isFDM"
                      :custom-style="{
                        width: '180rpx'
                      }">
                    </TnInput>
                  </view>
                </view>
                <view class="pos-side flex-c-b" v-if="isFDM">
                  <view class="label">止损方向</view>
                  <view class="value">
                    <TnRadioGroup
                      v-model="ele.posSide">
                      <TnRadio label="long" active-color="#62bc6e">做多</TnRadio>
                      <TnRadio
                        label="short"
                        active-color="#e6517b"
                        :custom-style="{marginRight: '0'}">做空</TnRadio>
                    </TnRadioGroup>
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
                  @click="onClickRmove('backStop', i)">
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
          title="全仓止损">
          <template #subHeader>
            <text
              class="iconfont icon-zengjia1 sc-danger"
              @click="onClickAdd('FDM')">
            </text>
          </template>
          <template #content>
            <view
              class="sc-card-content-label-value flex-c-b"
              v-for="(ele, i) in intervalForm.fdm"
              :key="i">
              <view class="left">
                <view class="interval flex-c-b">
                  <view class="label">止损区间</view>
                  <view class="value flex-a-c">
                    <TnInput
                      size="sm"
                      v-model="ele.start"
                      :placeholder="`${isFDM ? `手动输入价格` : `请输入`}`"
                      :custom-style="{
                        width: '180rpx'
                      }">
                    </TnInput>
                    <text
                      class="line"
                      v-if="!isFDM">-</text>
                    <TnInput
                      size="sm"
                      v-model="ele.end"
                      placeholder="请输入"
                      v-if="!isFDM"
                      :custom-style="{
                        width: '180rpx'
                      }">
                    </TnInput>
                  </view>
                </view>
                <view class="pos-side flex-c-b" v-if="isFDM">
                  <view class="label">止损方向</view>
                  <view class="value">
                    <TnRadioGroup
                      v-model="ele.posSide">
                      <TnRadio label="long" active-color="#62bc6e">做多</TnRadio>
                      <TnRadio
                        label="short"
                        active-color="#e6517b"
                        :custom-style="{marginRight: '0'}">做空</TnRadio>
                    </TnRadioGroup>
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
                  @click="onClickRmove('fdm', i)">
                </TnIcon>
              </view>
            </view>
          </template>
        </ScCard>
      </template>

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
    <TnPicker
      v-model="formData.instId"
      v-model:open="openCurrencyPicker"
      :data="currencyList"
      label-key="instId"
      value-key="instId"
      confirm-color="#020202"
      cancel-color="#e6517b"
      other-key="last"
    />
    <TnPicker
      v-model="formData.k"
      v-model:open="openKlinePicker"
      :data="klineList"
      confirm-color="#020202"
      cancel-color="#e6517b"
    />
  </view>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onShow, onLoad } from "@dcloudio/uni-app"
import { getCurrencyList, getAccountBalance, createStrategy, createInterval } from "@/api/sc-api"
import ScCard from '../../components/ScCard/index.vue'
import ScTitle from '@/components/ScTitle/index.vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import TnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'
import TnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnButton from "@tuniao/tnui-vue3-uniapp/components/button/src/button.vue"
import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
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
  ],
  posSide: [
    { required: true, message: '请选择持仓方向', trigger: ['blur', 'change'] },
  ],
  status: [
    { required: true, message: '请选择状态', trigger: ['blur', 'change'] },
  ],
  rate: [
    { required: true, message: '请输入张数比', trigger: ['blur', 'change'] },
  ],
  closeCount: [
    { required: true, message: '请输入分批止损次数', trigger: ['blur', 'change'] },
  ],
  k: [
    { required: true, message: '请选择K线趋势', trigger: ['blur', 'change'] },
  ],
}


interface IntervalForm {
  [key: string]: any
}
interface EumType {
  [key: string]: string
}
const isFDM = computed(() => {
  return formData.type === 'FDM'
})
const isCYR = computed(() => {
  return formData.type === 'CYR'
})
const isHYM = computed(() => {
  return formData.type === 'HYM'
})
const accountId = ref('')
onLoad((opt) => {
  accountId.value = opt?.accountId
  formData.acctId = opt?.accountId
})
onShow(() => {
  getOperateAmount()
  getCurrencys()
})
const formData = reactive({
  type: 'CYR',
  instId: '',
  posSide: '',
  status: 'UNABLE',
  closeCount: '1',
  operateAmount: '',
  rate: '',
  k: '',
  back: '',
  acctId: ''
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
  ],
  stop: [
    {
      type: 'STOP',
      start: '',
      end: '',
      posSide: '',
    }
  ],
  backProfit: [
    {
      type: 'BACK_PROFIT',
      start: '',
      end: '',
      posSide: '',
    }
  ],
  backStop: [
    {
      type: 'BACK_STOP',
      start: '',
      end: '',
      posSide: '',
    }
  ],
  fdm: [
    {
      type: 'FDM',
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
  const data = await getAccountBalance(accountId.value) as any
  balance.value = data
}

const openCurrencyPicker = ref(false)
const onClickCurrency = () => {
  openCurrencyPicker.value = true
}

const klineList = ref(['1m', '3m', '5m', '15m', '30m', '1H', '2H', '4H'])
const openKlinePicker = ref(false)
const onClickKline = () => {
  openKlinePicker.value = true
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
    posSide: '',
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

const onChangeType = (value: string) => {
  formRef.value?.resetFields()
  formData.type = value
  formData.instId = ''
  formData.posSide = ''
  formData.status = 'UNABLE'
  if (value === 'CYR') {
    formData.closeCount = '1'
  } else if (value === 'FDM') {
    formData.closeCount = '2'
  } else {
    formData.closeCount = ''
  }
  formData.operateAmount = ''
  formData.rate = ''
  formData.k = ''
  formData.back = ''
  formData.acctId = accountId.value
  intervalForm.tradeStrategyId = ''
  intervalForm.open = [{ type: 'OPEN', start: '', end: '', posSide: '' }]
  intervalForm.profit = [{ type: 'PROFIT', start: '', end: '', posSide: '' }]
  if (value === 'HYM') {
    intervalForm.stop = [
      { type: 'STOP', start: '0.98', end: '', posSide: 'long' },
      { type: 'STOP', start: '1.02', end: '', posSide: 'short' },
    ]
  } else {
    intervalForm.stop = [{ type: 'STOP', start: '', end: '', posSide: '' }]
  }
  intervalForm.backProfit = [{ type: 'BACK_PROFIT', start: '', end: '', posSide: '' }]
  intervalForm.backStop = [{ type: 'BACK_STOP', start: '', end: '', posSide: '' }]
  intervalForm.fdm = [{ type: 'FDM', start: '', end: '', posSide: '' }]
}

const onClickSave = debounce(async() => {
  await formRef.value?.validate()
  const res = await createStrategy(formData) as any
  intervalForm.tradeStrategyId = res
  const resp = await createInterval(intervalForm) as any
  if (resp === 'S') {
    uni.showToast({
      title: '保存成功',
    })
    setTimeout(() => {
      uni.hideToast()
      uni.navigateBack({
        delta: 1
      })
    }, 1000)
  }
}, 1000, true)

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
</style>
