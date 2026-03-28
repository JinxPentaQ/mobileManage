<template>
  <div class="flex flex-col h-dvh overflow-hidden">
    <div class="shrink-0">
      <NavBar />
    </div>
    <van-list
      class="flex-1 overflow-auto"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index">
        <ChannelItem :item="item" />
      </div>
    </van-list>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import ChannelItem from "../components/channelItem.vue";
import { ref } from "vue";
import { MerchantStoreHook } from "@/store/modules/merchant";
const route = useRoute();
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const requestParams = ref({
  mchId: "",
  page: 0,
  limit: 20,
});

const pagination = ref({
  pageSize: 20,
  currentPage: 1,
  total: 0,
});
const onLoad = () => {
  if (list.value.length >= pagination.value.total && requestParams.value.page > 0) {
    return;
  }
  requestParams.value.page = requestParams.value.page++;
  getList();
};

function getList() {
  requestParams.value.mchId = route.query.id;
  MerchantStoreHook()
    .getMerchantRateList(requestParams.value)
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
</script>
