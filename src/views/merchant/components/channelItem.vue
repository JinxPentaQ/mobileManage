<template>
  <div class="card flex flex-col">
    <div class="flex justify-between items-center">
      <div class="text-[12px] fw-800">
        <div>{{ item.channelName }}</div>
      </div>
      <div class="flex">
        <van-tag :type="MerchantStatusTag(item.isOpen)?.color">{{
          MerchantStatusTag(item.isOpen)?.text
        }}</van-tag>
        <van-tag class="ml-1">{{ item.currencyName }}</van-tag>
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">指定账户</div>
        {{ item.specifyName }}
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">费率</div>
        {{ item.rate }}
      </div>
      <div class="item">
        <div class="item-label">固定费率</div>
        {{ item.fixedRate }}
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">最小金额</div>
        {{ item.minAmount }}
      </div>
      <div class="item">
        <div class="item-label">最大金额</div>
        {{ item.maxAmount }}
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">指定金额</div>
        <div>{{ item.amountFilter }}</div>
      </div>
      <div class="item">
        <div class="item-label">描述</div>
        <div>{{ item.description }}</div>
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">模式</div>
        <div>{{ MerchantModeTypeTag(item.mode).text }}</div>
      </div>
      <div class="item">
        <div class="item-label">预检查</div>
        <div>{{ MerchantSwitchkTag(item.isPrecondition).text }}</div>
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">异常切换</div>
        <div>{{ MerchantSwitchkTag(item.isCheckoutNext).text }}</div>
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="item">
        <div class="item-label">平台名称</div>
        <div>{{ item.routePlatformNames }}</div>
      </div>
    </div>
    <!-- <div class="flex justify-between items-center border-t-1 mt-1 pt-1">
      <van-button type="primary" size="mini" @click="onChannel">通道配置</van-button>
      <van-button type="primary" size="mini" @click="onWallet">钱包</van-button>
    </div> -->
  </div>
</template>

<script setup>
import { MerchantStatusTag, MerchantSwitchkTag, MerchantModeTypeTag } from "@/views/merchant/utils";
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
  // border: 0.5px solid #ebedf0;
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
