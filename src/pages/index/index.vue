<template>
  <view class="main-page--container">
    <ScTitle :customStyle="{marginBottom: '30rpx'}"></ScTitle>
    <ScCard
      :title="item.name"
      v-for="(item, index) in accountList"
      :key="index"
      @click="onclick(item)">
        <template #subHeader>
          <TnTag
            :type="item.status === 'ENABLE' ? 'success' : 'danger'"
            :bg-color="`${item.status === 'ENABLE' ? '#62bc6e' : '#e6517b'}`"
            shape="round">{{ item.status === 'ENABLE' ? '启用' : '停用' }}</TnTag>
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
import { getAccountList } from "@/api/sc-api"
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue'
import ScCard from '../../components/ScCard/index.vue'
import ScTitle from '../../components/ScTitle/index.vue'

interface Account {
  id: string,
  apiKey: string,
  name: string,
  status: string
}

const accountList = ref<Account[]>([])
onShow(async ()=> {
  const data = await getAccountList() as any
  accountList.value = data
})

const getContent = computed(() => {
  return (row: Account) => {
    return [
      {
        label: 'ApiKey',
        value: row.apiKey
      }
    ]
  }
})

const onclick = (row: Account) => {
  uni.navigateTo({
    url: `/subPages/accountMenu/index?id=${row.id}&title=${row.name}`
  })
}

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
