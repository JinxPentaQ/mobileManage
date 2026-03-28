<template>
  <div class="flex flex-col items-center justify-center">
    <div class="logo enter-y mb-8 mt-8">
      <Logo class="!h-30 !w-30" name="logo" />
    </div>
    <div class="text-darkBlue dark:text-garyWhite enter-y mb-12 text-2xl font-black">
      {{ getTitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import { useDesignSetting } from "@/hooks/setting/useDesignSetting";
const { getTitle } = useDesignSetting();

</script>

<style scoped lang="less"></style>
