<template>
  <view class="main-page--container">
    <ScTitle title="基本信息" :customStyle="{marginBottom: '30rpx'}"></ScTitle>
    <TnForm
      :model="formData"
      ref="formRef"
      label-position="top"
      :rules="formRules"
      >
      <TnFormItem label="倍数" prop="lever">
        <TnInput
          v-model="formData.lever"
          placeholder="请输入倍数">
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
        </TnRadioGroup>
      </TnFormItem>
    </TnForm>
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
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onShow, onLoad, onUnload } from "@dcloudio/uni-app"
import { getCurrencyList, createLeverage } from "@/api/sc-api"
import ScTitle from '@/components/ScTitle/index.vue'
import TnForm from '@/uni_modules/tuniaoui/components/form/src/form.vue'
import TnFormItem from '@/uni_modules/tuniaoui/components/form/src/form-item.vue'
import TnInput from '@/uni_modules/tuniaoui/components/input/src/input.vue'
import TnPicker from '@/uni_modules/tuniaoui/components/picker/src/picker.vue'
import TnRadioGroup from '@/uni_modules/tuniaoui/components/radio/src/radio-group.vue'
import TnRadio from '@/uni_modules/tuniaoui/components/radio/src/radio.vue'
import TnButton from "@/uni_modules/tuniaoui/components/button/src/button.vue"
import type { FormRules, TnFormInstance } from '@/uni_modules/tuniaoui'
import { debounce } from "@/lib/utils"

const formRef = ref<TnFormInstance>()
const formRules: FormRules = {
  lever: [
    { required: true, message: '请选择策略', trigger: ['blur', 'change'] },
  ],
  instId: [
    { required: true, message: '请选择币种', trigger: ['blur', 'change'] },
  ],
  posSide: [
    { required: true, message: '请选择持仓方向', trigger: ['blur', 'change'] },
  ]
}
const formData = reactive({
  acctId: '',
  lever: '',
  posSide: '',
  instId: ''
})

const accountId = ref('')
onLoad((opt) => {
  accountId.value = opt?.accountId
  formData.acctId = opt?.accountId
})
onShow(() => {
  getCurrencys()
})

let timerId: any

onUnload(() => {
  timerId = null
})
const currencyList = ref([])
const getCurrencys = async () => {
  const data = await getCurrencyList(accountId.value) as any
  currencyList.value = data
}

const openCurrencyPicker = ref(false)
const onClickCurrency = () => {
  openCurrencyPicker.value = true
}

const onClickSave = debounce(async() => {
  await formRef.value?.validate()
  const res = await createLeverage(formData) as any
  if (res) {
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
</script>
<style lang="scss" scoped>
.save-btn {
  width: calc(100% - 60rpx);
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
}
</style>
