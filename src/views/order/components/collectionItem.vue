<template>
  <div class="card flex flex-col">
    <div class="flex justify-between items-center">
      <div class="text-[12px] fw-800">
        <div>{{ item.orderNo }}</div>
      </div>
      <div class="flex">
        <van-tag
          size="medium"
          :color="CollectionStatusTag(item.status).color"
          :text-color="CollectionStatusTag(item.status).textColor"
          >{{ CollectionStatusTag(item.status).text }}</van-tag
        >
      </div>
    </div>
    <div>
      <div class="item">
        <div class="item-label">商户单号</div>
        {{ item.mchOrderNo }}
      </div>
      <div class="item">
        <div class="item-label">平台单号</div>
        {{ item.customerOrderNo }}
      </div>
    </div>
    <div>
      <div class="item">
        <div class="item-label">通道</div>
        {{ item.channelName }}
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">商户</div>
        {{ item.mchUname }}
      </div>
      <div class="item">
        <div class="item-label">商户手续费</div>
        {{ item.mchFee }}
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">平台</div>
        {{ item.customerUname }}
      </div>
      <div class="item">
        <div class="item-label">支付金额</div>
        {{ item.customerAmount }}
      </div>
      <div class="item">
        <div class="item-label">平台手续费</div>
        {{ item.customerFee }}
      </div>
    </div>
    <div>
      <div class="item">
        <div class="item-label">存款信息</div>
        <div>{{ item.customerPayInfo }}</div>
      </div>
    </div>
    <div class="flex justify-between items-center border-t-1 mt-1 pt-1">
      <div class="item">
        <div class="item-label">创建</div>
        <div>{{ item.createdAt }}</div>
      </div>
      <!-- <div class="item">
        <div class="item-label">更新：</div>
        <div>{{ item.updatedAt }}</div>
      </div> -->
      <div class="mr-1 text-[16px] fw-800">{{ item.mchAmount }}</div>
    </div>
  </div>
</template>

<script setup>
import { CollectionStatusTag } from "@/views/order/utils";

const props = defineProps({
  item: { type: Object, default: () => {} },
});
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
