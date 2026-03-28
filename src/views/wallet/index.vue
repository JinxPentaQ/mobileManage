<template>
  <div>
    <div>
      <NavBar />
      <div class="wallet-card">
        <div>
          <span class="wallet-label">代收</span>
          <p class="wallet-value">{{ collection }}</p>
        </div>
        <div>
          <span class="wallet-label">代付</span>
          <p class="wallet-value">{{ payments }}</p>
        </div>
        <div>
          <span class="wallet-label">冻结</span>
          <p class="wallet-value">{{ freeze }}</p>
        </div>
        <div class="flex justify-end mt-4">
          <van-button type="success" size="mini" @click="onWalletChange">变更</van-button>
        </div>
      </div>

      <van-tabs v-model:active="currency" sticky shrink>
        <van-tab
          v-for="(item, index) in walletTypeList"
          :key="index"
          :title="item.text"
          :name="item.type"
        >
        </van-tab>
      </van-tabs>

      <div class="flex flex-row items-center">
        <van-dropdown-menu class="flex-1">
          <van-dropdown-item v-model="requestParams.direction" :options="directionOptions" />
          <van-dropdown-item v-model="requestParams.type" :options="typeOptions" />
        </van-dropdown-menu>
        <div class="ml-2 mr-2">
          <i class="i-material-symbols:filter-alt-outline text-sm" @click="showFilter = true" />
        </div>
      </div>
    </div>

    <van-list
      class="h-screen overflow-auto"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="加载中..."
      @load="onLoad"
    >
      <div v-for="item in list" :key="item" :title="item">
        <WalletItem :item="item" />
      </div>
    </van-list>

    <WalletFilter
      v-model:show="showFilter"
      :requestParams="requestParams"
      position="top"
      :round="true"
      @close="onPopupClose"
      @confrim="onConfrim"
      @reset="onReset"
    />
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import WalletItem from "./components/walletItem.vue";
import { ref } from "vue";
import {
  walletTypeList,
  walletRecordDirectionList,
  walletRecordTypeList,
} from "@/views/Wallet/utils";
import { WalletStoreHook } from "@/store/modules/wallet";
import router from "@/router";
import WalletFilter from "./components/walletFilter.vue";
import { format } from "date-fns";
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const currency = ref();
const collection = ref("");
const payments = ref("");
const freeze = ref("");
const wallet = ref();
const route = useRoute();
const showFilter = ref(false);

const directionOptions = ref([
  { text: "不限方向", value: "" },
  ...walletRecordDirectionList.value.map((item) => ({
    text: item.text,
    value: item.direction,
  })),
]);
const typeOptions = ref([
  { text: "不限类型", value: "" },
  ...walletRecordTypeList.value.map((item) => ({
    text: item.text,
    value: item.type,
  })),
]);

const walletRequestParams = ref({
  uid: "",
  uType: "",
  name: "",
  page: 1,
  limit: 20,
});

const requestParams = ref({
  walletId: "",
  date: [],
  startTime: false,
  endTime: false,
  amount: "",
  direction: "",
  typeModal: "",
  type: "",
  orderNo: "",
  page: 0,
  limit: 20,
});

const pagination = ref({
  pageSize: 20,
  currentPage: 1,
  total: 0,
});

const onLoad = () => {
  if (!requestParams.value.walletId) {
    return;
  }
  if (list.value.length >= pagination.value.total && requestParams.value.page > 0) {
    return;
  }
  requestParams.value.page = requestParams.value.page++;
  getList();
};
// 获取钱包列表
function getWalletList() {
  WalletStoreHook()
    .getWalletList(walletRequestParams.value)
    .then((res) => {
      if (res.code == "200") {
        const list = res.data.data;
        var w = { collection: {}, payments: {}, freeze: {} };
        for (let i = 0; i < list.length; i++) {
          if (list[i].currencyCode == "COLLECTION") {
            collection.value = list[i].balanceFee;
            w.collection = list[i];
          } else if (list[i].currencyCode == "PAYMENTS") {
            payments.value = list[i].balanceFee;
            w.payments = list[i];
          } else if (list[i].currencyCode == "FREEZE") {
            freeze.value = list[i].balanceFee;
            w.freeze = list[i];
          }
        }
        wallet.value = w;
      }
    });
}
// 获取钱包记录
function getList() {
  requestParams.startTime =
    requestParams.date?.length > 0 &&
    format(new Date(requestParams.date[0]), "yyyy-MM-dd HH:mm:ss");
  requestParams.endTime =
    requestParams.date?.length > 0 &&
    format(new Date(requestParams.date[1]), "yyyy-MM-dd HH:mm:ss");
  loading.value = true;
  WalletStoreHook()
    .getWalletRecordList(requestParams.value)
    .then((res) => {
      if (res.code === "200") {
        if (res.data.data.length > 0) {
          list.value = [...list.value, ...res.data.data];
          pagination.value.total = res.data.total;
          pagination.value.currentPage = res.data.current;
          pagination.value.pageSize = res.data.size;
        } else {
          list.value = res.data.data;
        }
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (list.value.length >= res.data.total) {
          finished.value = true;
        }
      } else {
        // 加载状态结束
        loading.value = false;
      }
    })
    .finally(() => (loading.value = false));
}

function onSearch() {
  requestParams.startTime =
    requestParams.date?.length > 0 &&
    format(new Date(requestParams.date[0]), "yyyy-MM-dd HH:mm:ss");
  requestParams.endTime =
    requestParams.date?.length > 0 &&
    format(new Date(requestParams.date[1]), "yyyy-MM-dd HH:mm:ss");
  loading.value = true;
  WalletStoreHook()
    .getWalletRecordList(requestParams.value)
    .then((res) => {
      if (res.code === "200") {
        if (res.data.data.length > 0) {
          list.value = res.data.data;
          pagination.value.total = res.data.total;
          pagination.value.currentPage = res.data.current;
          pagination.value.pageSize = res.data.size;
        } else {
          list.value = res.data.data;
        }
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (list.value.length >= res.data.total) {
          finished.value = true;
        }
      } else {
        // 加载状态结束
        loading.value = false;
      }
    })
    .finally(() => (loading.value = false));
}

function onWalletChange() {
  router.push({
    name: "walletChange",
    query: { name: walletRequestParams.value.name },
  });
  router.push({
    name: "walletChange",
    query: {
      uId: walletRequestParams.value.uid,
      uType: walletRequestParams.value.uType,
      name: walletRequestParams.value.name,
    },
  });
}

function onPopupClose() {
  console.log("弹窗已关闭，可以在这里执行后续逻辑");
}

function onConfrim(data) {
  console.log(data, "data");
  onSearch();
}

// 重置
function onReset() {
  requestParams.amount = "";
  requestParams.direction = "";
  requestParams.type = "";
  requestParams.date = [];
  onSearch();
}

// 监听 props 的变化
watch(
  () => wallet,
  (newWallet) => {
    console.log("props 变化:", newWallet);
    requestParams.value.walletId = newWallet.value.collection.id;
    if (newWallet.value.collection.id) {
      onLoad();
    }
  },
  { deep: true },
);

// // 监听 props 的变化
watch(
  () => currency,
  (newCurrency) => {
    console.log(newCurrency, "currency");
    if (wallet.value) {
      let walletId = "";
      if (newCurrency.value == "COLLECTION") {
        walletId = wallet.value.collection.id;
      } else if (newCurrency.value == "PAYMENTS") {
        walletId = wallet.value.payments.id;
      } else if (newCurrency.value == "FREEZE") {
        walletId = wallet.value.freeze.id;
      }
      requestParams.value.walletId = walletId;
      list.value = [];
      getList();
    }
  },
  { deep: true },
);

watch(
  () => requestParams.value.direction,
  (newFormMchId) => {
    onSearch();
  },
  { deep: true },
);
watch(
  () => requestParams.value.type,
  (newFormMchId) => {
    onSearch();
  },
  { deep: true },
);

onMounted(() => {
  walletRequestParams.value.uid = route.query.uId;
  walletRequestParams.value.uType = route.query.uType;
  walletRequestParams.value.name = route.query.name;
  getWalletList();
});
</script>
<style lang="less" scoped>
.wallet-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  background-color: #f7f8fa;
  margin: 8px 16px;
}

.wallet-label {
  font-size: 12px;
  color: #969799;
}

.wallet-value {
  font-size: 14px;
  color: #646566;
}
:deep(.van-dropdown-menu__bar) {
  height: 35px;
  box-shadow: none;
}
</style>
