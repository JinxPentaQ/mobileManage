<template>
  <div class="card flex flex-col">
    <div class="flex justify-between items-center">
      <div class="title">
        <div>{{ item.account }}-{{ item.mchName }}</div>
      </div>
      <div class="flex">
        <van-tag :type="MerchantStatusTag(item.status)?.color">{{
          MerchantStatusTag(item.status)?.text
        }}</van-tag>
        <van-tag class="ml-1" :type="MerchantTypeTag(item.type)?.color">{{
          MerchantTypeTag(item.type)?.text
        }}</van-tag>
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">商户号</div>
        {{ item.mchNo }}
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">代收</div>
        {{ item.collectionAmount }}
      </div>
      <div class="item">
        <div class="item-label">代付</div>
        <div>{{ item.paymentsAmount }}</div>
      </div>
    </div>
    <div class="flex justify-between border-t-1 mt-1 pt-1 items-center">
      <div class="">{{ item.createdAt }}</div>
      <div>
        <van-button type="default" size="mini" @click.stop="onChannel">通道配置</van-button>
        <van-button type="default" size="mini" @click.stop="onWallet">钱包</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MerchantStatusTag, MerchantTypeTag } from "@/views/merchant/utils";
import router from "@/router";

const props = defineProps({
  item: { type: Object, default: () => {} },
});
const onChannel = () => {
  router.push({ name: "MerchantChannel", query: { id: props.item.id } });
};
const onWallet = () => {
  router.push({
    name: "Wallet",
    query: { uId: props.item.id, uType: "MERCHANT", name: props.item.mchName },
  });
};
</script>
<style scoped lang="less">
.card {
  padding: 8px 12px;
  margin: 12px;
  margin-bottom: 8px;
  font-size: 12px;
  border-radius: 10px;
  color: #646566;
  background-color: #f7f8fa;
 
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: #323233;
}

.item {
  display: flex;
  align-items: center;
  margin-right: 4px;
}

.item-label {
  color: #969799;
  padding-right: 4px;
}
</style>
