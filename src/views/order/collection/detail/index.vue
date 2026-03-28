<template>
  <div>
    <NavBar />
    <van-cell-group inset>
      <van-cell
        title="订单状态"
        :value="detail.status && CollectionStatusTag(detail.status).text"
      />
      <van-cell title="通道名称" :value="detail.channelCurrencyName" />
      <van-cell title="创建时间" :value="detail.createdAt" />
      <van-cell title="完成时间" :value="detail.updatedAt" />
      <van-cell title="商户名称" :value="detail.mchUname" />
      <van-cell title="订单金额" :value="detail.mchAmount" />
      <van-cell title="商户手续费" :value="detail.mchFee" />
      <van-cell title="存款信息" :label="detail.customerPayInfo" />
      <van-cell title="平台名称" :value="detail.customerUname" />
      <van-cell title="支付金额" :value="detail.customerAmount" />
      <van-cell title="平台手续费" :value="detail.customerFee" />
      <van-cell title="回调信息" :label="detail.mchNotifyContent" />
    </van-cell-group>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { CollectionStatusTag } from "@/views/order/utils";
import { CollectOrderStoreHook } from "@/store/modules/collection";
const route = useRoute();
const detail = ref({});
function getInfo() {
  CollectOrderStoreHook()
    .getOrder({
      id: route.query.id,
    })
    .then((res) => {
      console.log(res);
      if (res.code === "200") {
        detail.value = res.data;
        detail.value.mchNotifyContent = `${res.data.mchNotifyContent}  (${res.data.mchNotifyStatus})`;
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
