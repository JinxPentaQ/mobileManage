<template>
  <div>
    <NavBar />
    <van-form>
      <van-cell-group inset>
        <CustomPicker
          v-model="form.toWalletType"
          label="钱包"
          placeholder="请点击选择钱包"
          :options="walletTypeOptions"
          picker-title="选择钱包"
        />
        <CustomPicker
          v-model="form.type"
          label="类型"
          placeholder="请点击选择类型"
          :options="changeTypeOptions"
          picker-title="选择类型"
        />
        <van-field
          v-model="form.amount"
          label="金额"
          type="number"
          placeholder="金额"
          @input="onAmountChange"
        />
        <van-field
          v-model="form.rate"
          label="汇率"
          type="number"
          placeholder="汇率"
          @input="onRateChange"
        />
        <div class="flex items-center justify-between">
          <van-field
            v-model="form.amount"
            label="人民币"
            type="number"
            placeholder="人民币"
            label-align="top"
            @input="onAmountChange"
          />
          <div><i class="i-humbleicons:exchange-horizontal mr-6 text-lg" /></div>

          <van-field
            v-model="form.usdt"
            label="Usdt"
            type="number"
            placeholder="Usdt"
            label-align="top"
            @input="onUsdtChange"
          />
        </div>

        <van-field v-model="form.code" label="谷歌验证码" placeholder="谷歌验证码" />
        <van-field v-model="form.desc" label="备注" placeholder="备注" label-align="top" />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" @click="onSubmit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { showFailToast, showSuccessToast } from "vant";
import NavBar from "@/components/NavBar.vue";
import CustomPicker from "@/components/FiledPicker.vue";
import { WalletStoreHook } from "@/store/modules/wallet";
import { walletTypeList, WalletChangeType, walletTypeItem } from "@/views/wallet/utils";

const router = useRouter()
const route = useRoute();
const wallet = ref();
const form = ref({
  toWalletType: "",
  type: "",
  amount: "",
  rate: "",
  usdt: "",
  code: "",
  desc: "",
});
const walletRequestParams = ref({
  uid: "",
  uType: "",
  name: "",
});
const changeTypeOptions = ref([]);
const walletTypeOptions = computed(() => {
  return walletTypeList.value.map((item) => {
    return {
      text: item.text,
      value: item.type,
    };
  });
});
// 监听 props 的变化
watch(
  () => form.value.toWalletType,
  (newFormType) => {
    changeTypeOptions.value = WalletChangeType(newFormType).map((item) => {
      return {
        text: item.label,
        value: item.value,
      };
    });
    form.value.toWalletType = newFormType;
    form.value.type = "";
    form.value.desc = setDesc();
    // }
  },
  { deep: true },
);
// 切换类型
watch(
  () => form.value.type,
  (newFormType) => {
    form.value.desc = setDesc();
  },
  { deep: true },
);
// 切换汇率
const onRateChange = () => {
  const newRate = +form.value.rate;
  const amount = +form.value.amount;
  const usdt = +form.value.usdt;
  const isUsdtEmpty = +form.value.usdt <= 0;
  const isAmountEmpty = +form.value.amount <= 0;
  console.log(newRate, amount, usdt, isUsdtEmpty, isAmountEmpty);
  if (!newRate) {
    form.value.usdt = "";
    form.value.amount = "";
    form.value.desc = setDesc();
    return;
  }
  // 金额为空 usdt有值 时输入汇率
  if (isAmountEmpty && !isUsdtEmpty) {
    form.value.amount = newRate ? (usdt * +newRate).toFixed(3) : "";
    form.value.desc = setDesc();
    return;
  }
  // 金额有值 usdt为空 时输入汇率
  if (isUsdtEmpty && !isAmountEmpty) {
    form.value.usdt = newRate ? (amount / +newRate).toFixed(3) : "";
    form.value.desc = setDesc();
    return;
  }
  // 金额和usdt都有值
  if (!isUsdtEmpty && !isAmountEmpty) {
    form.value.usdt = newRate ? (amount / +newRate).toFixed(3) : "";
    form.value.desc = setDesc();
    return;
  }
  // 金额和usdt为空
  if (isUsdtEmpty && isAmountEmpty) {
    form.value.usdt = newRate ? (amount / +newRate).toFixed(3) : "";
    form.value.desc = setDesc();
    return;
  }
};
// 切换金额
const onAmountChange = () => {
  const newAmount = +form.value.amount;
  form.value.usdt = newAmount ? (newAmount / +form.value.rate).toFixed(3) : "";
  form.value.desc = setDesc();
};
// 切换usdt
const onUsdtChange = () => {
  const newUsdt = +form.value.usdt;
  form.value.amount = newUsdt ? (newUsdt * +form.value.rate).toFixed(3) : "";
  form.value.desc = setDesc();
};
// 备注
const setDesc = () => {
  const mchName = route.query.name;
  const type = form.value.type
    ? `${changeTypeOptions.value.find((item) => item.value == form.value.type).text} | `
    : "";
  const wallet = form.value.toWalletType
    ? `${walletTypeItem(form.value.toWalletType).text}钱包`
    : "";
  const amount =
    form.value.type !== "3"
      ? `${form.value.amount || 0}/${form.value.rate || 0} = ${form.value.rate ? form.value.usdt : 0}`
      : form.value.amount || 0;
  return `${type}${wallet} | ${mchName} | ${amount}`;
};
function getWalletList() {
  WalletStoreHook()
    .getWalletList(walletRequestParams.value)
    .then((res) => {
      if (res.code == "200") {
        const list = res.data.data;
        var w = { collection: {}, payments: {}, freeze: {} };
        for (let i = 0; i < list.length; i++) {
          if (list[i].currencyCode == "COLLECTION") {
            w.collection = list[i];
          } else if (list[i].currencyCode == "PAYMENTS") {
            w.payments = list[i];
          } else if (list[i].currencyCode == "FREEZE") {
            w.freeze = list[i];
          }
        }
        wallet.value = w;
      }
    });
}
// 提交
const onSubmit = () => {
  const requestData = {...form.value};
  console.log(wallet, "wallet");
  const collectionWalletId = wallet.value.collection.id;
  const paymentsWalletId = wallet.value.payments.id;
  const freezeWalletId = wallet.value.freeze.id;
  switch (form.value.toWalletType) {
    case "COLLECTION":
      requestData.toWalletId = collectionWalletId;
      break;
    case "PAYMENTS":
      requestData.toWalletId = paymentsWalletId;
      break;
    case "FREEZE":
      requestData.toWalletId = freezeWalletId;
      break;
    default:
      return;
  }
  WalletStoreHook()
    .changeWallet(requestData)
    .then((res) => {
      console.log(res);
      if (res.code == "200") {
        showSuccessToast('操作成功');
        router.go(-1);
      } else {
        showFailToast(res.message);
      }
    })
};
onMounted(() => {
  walletRequestParams.value.uid = route.query.uId;
  walletRequestParams.value.uType = route.query.uType;
  walletRequestParams.value.name = route.query.name;
  getWalletList();
});
</script>
<style lang="less" scoped>
.filter-tab {
  display: flex;
  margin: 0 16px;
  margin-top: 16px;
}

.filter-tag {
  margin-right: 8px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 50px;
  background-color: rgb(244, 244, 245);
  border: 1px solid rgb(233, 233, 235);
  color: #909399;
}

.active {
  background-color: rgb(236, 245, 255);
  border-color: rgb(217, 236, 255);
  color: #409eff;
}

.search-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.search-type {
  width: 100px;
  font-size: 12px;
  .van-dropdown-menu__bar {
    height: 35px;
    box-shadow: none;
  }
  .van-ellipsis {
    font-size: 12px;
  }
}

.search-input {
  flex: 1;
  font-size: 12px;
  padding: 0;
}
</style>
