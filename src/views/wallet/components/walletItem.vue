<template>
  <div class="card flex flex-col">
    <div class="flex justify-between items-center">
      <div class="title">
        <div>{{ WalletRecordTypeTag(item.type)?.text }}</div>
      </div>
      <van-tag class="mr-1" :type="WalletRecordDirectionTag(item.direction)?.color">{{
        WalletRecordDirectionTag(item.direction)?.text
      }}</van-tag>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">关联</div>
        <div>{{ item.orderNo }}</div>
      </div>
    </div>

    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">描述</div>
        <div>{{ item.description }}</div>
      </div>
    </div>

    <div class="flex flex-col border-t-1 mt-1 pt-1">
      <div class="amount">{{ `${item.type === 1 ? "+" : "-"}` }}{{ item.changeAmount }}</div>
      <div class="flex justify-between items-center">
        <div>
          {{ item.createdAt }}
        </div>
        <div class="flex flex-row">
          <div class="item">
            <div class="item-label">Usdt</div>
            {{ item.usdt }}
          </div>
          <div class="item">
            <div class="item-label">余额</div>
            <div>{{ item.endingAmount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { WalletRecordDirectionTag, WalletRecordTypeTag } from "@/views/Wallet/utils";

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
  // color: #323233;
}

.item-label {
  color: #969799;
  padding-right: 4px;
}

.amount {
  font-size: 14px;
  font-weight: 800;
  text-align: right;
}
</style>
