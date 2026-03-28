<template>
  <div class="flex flex-col h-dvh overflow-hidden">
    <div class="shrink-0">
      <NavBar />
      <div class="flex flex-row items-center">
        <van-dropdown-menu class="flex-1">
          <van-dropdown-item v-model="requestParams.mchUid" :options="merchantOptions" />
          <van-dropdown-item v-model="requestParams.platformId" :options="platformOptions" />
          <van-dropdown-item v-model="requestParams.status" :options="typeOptions" />
        </van-dropdown-menu>
        <div class="ml-2 mr-2">
          <i class="i-material-symbols:filter-alt-outline text-sm" @click="showFilter = true" />
        </div>
      </div>
    </div>

    <van-list
      v-model:loading="loading"
      class="flex-1 overflow-auto"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index">
        <PaymentItem :item="item" @click="onDetail(item.id)" />
      </div>
    </van-list>
    <PaymentFilter
      v-model:show="showFilter"
      :requestParams="requestParams"
      position="top"
      :round="true"
      :merchantformData="merchantformData"
      :platformformData="platformformData"
      @close="onPopupClose"
      @confrim="onConfrim"
      @reset="onReset"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import PaymentItem from "../components/paymentItem.vue";
import PaymentFilter from "../components/paymentFilter.vue";
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import { PaymentsOrderStoreHook } from "@/store/modules/payment";
import { MerchantStoreHook } from "@/store/modules/merchant";
import { PlatformStoreHook } from "@/store/modules/platform";
import { format } from "date-fns";
import { paymentsStatusList } from "@/views/order/utils";
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const showFilter = ref(false);
const merchantformData = ref([]);
const platformformData = ref([]);
const requestParams = ref({
  status: "",
  orderNo: "",
  mchOrderNo: "",
  customerOrderNo: "",
  mchUid: "",
  platformId: "",
  date: [],
  startTime: "",
  endTime: "",
  maxAmount: "",
  minAmount: "",
  code: "",
  page: 0,
  limit: 20,
});
const pagination = ref({
  pageSize: 20,
  currentPage: 1,
  total: 0,
});

const merchantOptions = ref();
const platformOptions = ref();
const typeOptions = ref([{ text: "全部状态", value: "" }, ...paymentsStatusList.value]);

function onPopupClose() {
  console.log("弹窗已关闭，可以在这里执行后续逻辑");
}

function onLoad() {
  if (list.value.length >= pagination.value.total && requestParams.value.page > 0) {
    return;
  }
  if (requestParams.value.page === 0) {
    getDefaultDate();
  }
  requestParams.value.page = requestParams.value.page++;
  getList();
}

function getList() {
  requestParams.value.startTime = requestParams.value.date?.length
    ? format(new Date(requestParams.value.date[0]), "yyyy-MM-dd HH:mm:ss")
    : "";
  requestParams.value.endTime = requestParams.value.date?.length
    ? format(new Date(requestParams.value.date[1]), "yyyy-MM-dd HH:mm:ss")
    : "";

  PaymentsOrderStoreHook()
    .getPaymentsOrderList(requestParams.value)
    .then((res) => {
      console.log(res);
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
  requestParams.value.startTime = requestParams.value.date?.length
    ? format(new Date(requestParams.value.date[0]), "yyyy-MM-dd HH:mm:ss")
    : "";
  requestParams.value.endTime = requestParams.value.date?.length
    ? format(new Date(requestParams.value.date[1]), "yyyy-MM-dd HH:mm:ss")
    : "";

  PaymentsOrderStoreHook()
    .getPaymentsOrderList(requestParams.value)
    .then((res) => {
      console.log(res);
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

function onDetail(id) {
  router.push({ name: "PaymentDetail", query: { id: id } });
}

function onConfrim(data) {
  console.log(data, "data");
  onSearch();
}

// 重置
function onReset() {
  requestParams.value.orderNo = "";
  requestParams.value.mchOrderNo = "";
  requestParams.value.customerOrderNo = "";
  requestParams.value.mchUid = "";
  requestParams.value.platformId = "";
  requestParams.value.status = "";
  requestParams.value.date = [];
  requestParams.value.minAmount = "";
  requestParams.value.maxAmount = "";
  onSearch();
}

function getAllMerchant() {
  MerchantStoreHook()
    .getAllMerchant()
    .then((res) => {
      console.log(res);
      if (res.code == "200") {
        merchantformData.value = res.data.map((item) => ({
          ...item,
          text: `${item.nickName}-${item.mchName}`,
          value: item.id,
        }));
        merchantOptions.value = [{ text: "全部商户", value: "" }, ...merchantformData.value];
      }
    });
}

function getAllPlatform() {
  PlatformStoreHook()
    .getAllPlatform()
    .then((res) => {
      console.log(res);
      if (res.code == "200") {
        platformformData.value = res.data.map((item) => ({
          text: item.customerName,
          value: item.id,
        }));
        platformOptions.value = [{ text: "全部平台", value: "" }, ...platformformData.value];
      }
    });
}

// 默认时间
const getDefaultDate = () => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // 今天的 00:00:00
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59); // 今天的 23:59:59
  requestParams.value.date = [
    format(new Date(startOfDay), "yyyy-MM-dd HH:mm:ss"),
    format(new Date(endOfDay), "yyyy-MM-dd HH:mm:ss"),
  ];
};

// 监听 props 的变化
watch(
  () => requestParams.value.mchUid,
  (newFormMchId) => {
    onSearch();
  },
  { deep: true },
);
watch(
  () => requestParams.value.platformId,
  (newFormMchId) => {
    onSearch();
  },
  { deep: true },
);
watch(
  () => requestParams.value.status,
  (newFormMchId) => {
    onSearch();
  },
  { deep: true },
);

onMounted(() => {
  getAllMerchant();
  getAllPlatform();
});
</script>

<style lang="less" scoped>
:deep(.van-dropdown-menu__bar) {
  height: 35px;
  box-shadow: none;
}
</style>
