<template>
  <view class="main-page--container">
    <view class="property-container">
      <view class="title">总资产估值</view>
      <view class="amount">{{ capital || '-' }}</view>
    </view>
    <view class="nav-container">
      <view
        class="nav-item"
        v-for="(item, index) in navs"
        :key="index"
        @click="onClickItem(item)">
        <view class="icon">
          <text :class="`iconfont ${item.icon}`"></text>
        </view>
        <view class="name">{{ item.name }}</view>
      </view>
    </view>

    <TnPicker
      v-model="account"
      v-model:open="openClosePicker"
      :data="accountList"
      @confirm="(onClickClosePickerConfirm as Function)"
      label-key="name"
      value-key="id"
      confirm-color="#020202"
      cancel-color="#e6517b"
    />
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from "@dcloudio/uni-app"
import TnPicker from '@/uni_modules/tuniaoui/components/picker/src/picker.vue'
import { getCapital, getAccountList, closePosition, pullTheBrake } from "@/api/sc-api"
import { debounce } from "@/lib/utils"

interface Navs {
  name: string,
  icon: string,
  url: string | null
}
const navs = ref<Navs[]>([
  {
    name: '订单',
    icon: 'icon-dingdan',
    url: '/subPages/order/index'
  },
  {
    name: '拉闸',
    icon: 'icon-weibiaoti--',
    url: null
  },
  {
    name: '止盈',
    icon: 'icon-jinqian',
    url: null
  },
])

const pullBrake = () => {
  uni.showModal({
    title: '提示',
    content: `确定拉闸？`,
    confirmColor: '#020202',
    cancelColor: '#e6517b',
    success: async function (res) {
      if (res.confirm) {
        const resp = await pullTheBrake() as any
        if (resp === 'S') {
          uni.showToast({
            title: '拉闸成功！',
          })
        }
      }
    }
  })
}

const openClosePicker = ref(false)
const close = () => {
  openClosePicker.value = true
}
const onClickItem = (row: Navs) => {
  if (row.url) {
    uni.navigateTo({
      url: row.url
    })
  } else {
    if (row.name === '拉闸') {
      pullBrake()
    } else if (row.name === '止盈') {
      close()
    }
  }
}
const capital = ref()
const getAllCapital = debounce(async () => {
  const res = await getCapital()
  capital.value = res
}, 1500, true)

interface Account {
  id: string,
  apiKey: string,
  name: string,
  status: string
}
const account = ref()
const accountList = ref<Account[]>([])
const getAccounts = async () => {
  const data = await getAccountList() as any
  accountList.value = [ { name: '全部', id: null } , ...data ]
}

const onClickClosePickerConfirm = (val: number) => {
  uni.showModal({
    title: '提示',
    content: `确定止盈？`,
    confirmColor: '#020202',
    cancelColor: '#e6517b',
    success: async function (res) {
      if (res.confirm) {
        const resp = await closePosition(val) as any
        if (resp === 'S') {
          uni.showToast({
            title: '止盈成功！',
          })
        }
      }
    }
  })
}
onShow(() => {
  getAllCapital()
  getAccounts()
})
</script>
<style lang="scss" scoped>
.property-container {
  margin-top: 20rpx;
  .title {
    color: #3c3c3c;
  }
  .amount {
    color: #020202;
    font-size: 68rpx;
    font-weight: 900;
  }
}
.nav-container {
  display: flex;
  align-items: center;
  margin-top: 40rpx;
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    .icon {
      text {
        font-size: 52rpx;
        color: #030303;
        font-weight: 300;
      }
    }
    .name {
      margin-top: 4rpx;
      color: #030303;
      font-weight: 500;
    }
  }
}
</style>
