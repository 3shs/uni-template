<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app"

onLaunch(() => {
  console.log("App Launch")
    uni.login({
    provider: 'weixin',
    success(res) {
      console.log(res)
    }
  })
})
onShow(() => {
  console.log("App Show")
})
onHide(() => {
  console.log("App Hide")
})
</script>
<style>
@import '@tuniao/tn-style/dist/uniapp/index.css';
</style>
