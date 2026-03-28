<template>
  <div class="flex flex-col h-dvh overflow-hidden">
    <div class="shrink-0">
      <NavBar />
      <div class="search-container">
        <van-dropdown-menu class="search-type">
          <van-dropdown-item v-model="searchType" :options="searchTypeList" />
        </van-dropdown-menu>
        <van-search
          class="search-input"
          v-model="searchValue"
          show-action
          placeholder="请输入商户号/商户名/商户昵称"
          @clear="onSearchClear"
        >
          <template #action>
            <div @click="onSubmitSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="filter-tab">
        <div
          v-for="(item, index) in merchantTypeList"
          :key="index"
          @click="onTypeChange(item.status)"
        >
          <div class="filter-tag" :class="{ active: item.status === requestParams.type }">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <van-list
      class="flex-1 overflow-auto"
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      loading-text="加载中..."
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index">
        <MerchantItem :item="item" @click="onDetail(item.id)" />
      </div>
    </van-list>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import MerchantItem from "./components/merchantItem.vue";
import { MerchantStoreHook } from "@/store/modules/merchant";
import { ref } from "vue";
import router from "@/router";
import { merchantTypeList } from "./utils";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const requestParams = ref({
  page: 1,
  limit: 20,
  mchNo: "",
  mchName: "",
  account: "",
  type: "",
});
const pagination = ref({
  pageSize: 20,
  currentPage: 1,
  total: 0,
});
const searchValue = ref();
const searchType = ref("mchNo");
const searchTypeList = [
  { text: "商户号", value: "mchNo" },
  { text: "商户名", value: "mchName" },
  { text: "商户昵称", value: "account" },
];

const onLoad = () => {
  if (list.value.length >= pagination.value.total && requestParams.value.page > 0) {
    return;
  }
  requestParams.value.page = requestParams.value.page++;
  getList();
};

const getList = () => {
  loading.value = true;
  MerchantStoreHook()
    .getMerchantList(requestParams.value)
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
};

const onSearch = () => {
  loading.value = true;
  MerchantStoreHook()
    .getMerchantList(requestParams.value)
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
};

const onDetail = (id) => {
  router.push({ name: "MerchantDetail", query: { id: id } });
};

function onTypeChange(type) {
  requestParams.value.type = type;
  onSearch();
}

function onSubmitSearch() {
  const newResqustParams = {
    ...requestParams.value,
    mchNo: "",
    mchName: "",
    account: "",
  };
  newResqustParams[searchType.value] = searchValue.value;
  requestParams.value = newResqustParams;
  onSearch();
}

function onSearchClear() {
  requestParams.value = {
    ...requestParams.value,
    mchNo: "",
    mchName: "",
    account: "",
  };
  onSearch();
}

onMounted(() => {
  getList();
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

:deep(.van-dropdown-menu__bar) {
  height: 35px;
  box-shadow: none;
}
</style>
