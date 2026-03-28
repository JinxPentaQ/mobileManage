<template>
  <div class="h-screen flex-center p-20px">
    <div class="wel-box w-full flex flex-col items-center justify-between">
      <Logo class="!h-30 !w-30" />
      <div class="text-darkBlue dark:text-garyWhite mb-4 mt-12 text-center text-2xl font-black">
        {{ getTitle }}
      </div>
      <div class="mb-6 mt-4 w-full">
        <div class="mt-3" v-for="(item, index) in getSwipeText" :key="index">
          <div class="text-4 fw-600">
            {{ item.title }}
          </div>
          <div class="flex flex-row mt-1">
            <div
              class="rounded-1xl pb-2"
              v-for="(subItem, subIndex) in item.items"
              :key="subIndex"
            >
              <div class="mr-2 flex-col flex-center b-1 rounded-1 p-2" @click="goMenu(subItem.url)">
                <div :class="item.icon" />
                <div>{{ subItem.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import router from "@/router";

defineOptions({
  name: "DashboardPage",
});

import { useDesignSetting } from "@/hooks/setting/useDesignSetting";

const { getTitle } = useDesignSetting();

const getSwipeText = computed(() => {
  return [
    {
      title: "订单管理",
      icon: "i-material-symbols:article",
      items: [
        {
          title: "代收订单",
          url: "/collection",
        },
        {
          title: "代付订单",
          url: "/payment",
        },
      ],
    },
    {
      title: "商户管理",
      icon: "i-material-symbols:deployed-code-alert-rounded",
      items: [
        {
          title: "商户列表",
          url: "/merchant",
        },
      ],
    },
  ];
});

const goMenu = (url) => {
  router.push(url)
}
</script>

<style scoped lang="less"></style>
