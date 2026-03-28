<template>
  <div>
    <NavBar />
    <van-cell-group inset>
      <van-cell title="id" :value="detail.id" />
      <van-cell title="商户号" :value="detail.mchNo" />
      <van-cell title="商户名称" :value="detail.mchName" />
      <van-cell title="商户昵称" :value="detail.account" />
      <van-cell title="类型" :value="detail.type ? MerchantTypeTag(detail.type).text : ''" />
      <van-cell title="状态" :value="detail.type ? MerchantStatusTag(detail.status).text : ''" />
      <van-cell title="代收限额" :value="detail.dailyLimitCollectionAmount" />
      <van-cell title="代付限额" :value="detail.dailyLimitPaymentsAmount" />
      <van-cell title="商户API秘钥" :label="detail.apiPrivateKey" />
      <van-cell title="API IP白名单" :label="detail.apiWhiteList" />
      <van-cell title="后台登录白名单" :label="detail.whiteList" />
      <van-cell title="允许重复创建订单" :value="detail.whiteList" />
      <van-cell title="描述" :label="detail.description" />
      <van-cell title="收银台地址" :label="detail.cashierUrl" />
    </van-cell-group>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { MerchantStatusTag, MerchantTypeTag } from "@/views/merchant/utils";
import { MerchantStoreHook } from "@/store/modules/merchant";
const route = useRoute();
const detail = ref({});
function getInfo() {
  MerchantStoreHook()
    .getMerchantDetail({
      id: route.query.id,
    })
    .then((res) => {
      console.log(res);
      if (res.code === "200") {
        detail.value = res.data;
      }
    });
}
onMounted(() => {
  console.log("id:", route.query);
  if (route.query.id) {
    getInfo();
  }
});
</script>
