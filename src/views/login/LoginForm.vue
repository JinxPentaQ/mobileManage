<template>
  <van-form v-if="getShow" ref="formRef" class="flex flex-col items-center" @submit="handleSubmit">
    <van-field
      v-model="formData.account"
      class="enter-y mb-4 items-center !rounded-md"
      name="account"
      placeholder="用户名"
      :rules="getFormRules.account"
    >
      <template #left-icon>
        <i class="i-ph:user-bold mr-2 text-lg" />
      </template>
    </van-field>
    <van-field
      v-model="formData.pwd"
      class="enter-y mb-4 items-center !rounded-md"
      :type="switchPassType ? 'password' : 'text'"
      name="password"
      placeholder="密码"
      :rules="getFormRules.pwd"
      @click-right-icon="switchPassType = !switchPassType"
    >
      <template #left-icon>
        <i class="i-iconamoon:lock-bold mr-2 text-lg" />
      </template>
      <template #right-icon>
        <i v-if="switchPassType" class="i-mdi:eye-outline mr-2 text-lg" />
        <i v-else class="i-mdi:eye-off mr-2 text-lg" />
      </template>
    </van-field>
    <van-field
      v-model="formData.code"
      class="enter-y mb-4 items-center !rounded-md"
      name="code"
      placeholder="谷歌验证码"
      :rules="getFormRules.code"
    >
      <template #left-icon>
        <i class="i-f7:logo-google mr-2 text-lg" />
      </template>
    </van-field>
    <van-button
      class="enter-y !mb-4 !rounded-md"
      type="primary"
      block
      native-type="submit"
      :loading="loading"
    >
      登 录
    </van-button>
  </van-form>
</template>

<script setup lang="ts">
import { showFailToast, showLoadingToast, showSuccessToast } from "vant";
import type { FormInstance } from "vant";
import * as CryptoJS from "crypto-js";
import { LoginStateEnum, useFormRules, useLoginState } from "./useLogin";
import { useUserStore } from "@/store/modules/user";
import { ResultEnum } from "@/enums/httpEnum";
import { useDesignSettingStore } from '@/store/modules/designSetting'
const { getTitle } = useDesignSetting()
const { setLoginState, getLoginState } = useLoginState();
const { getFormRules } = useFormRules();
const userStore = useUserStore();
const designStore = useDesignSettingStore()
const router = useRouter();
const route = useRoute();

const formRef = ref<FormInstance>();
const loading = ref(false);
const rememberMe = ref(false);
const switchPassType = ref(true);
const formData = reactive({
  account: "",
  pwd: "",
  code: "",
});
import { storage } from "@/utils/Storage";
import { useDesignSetting } from "@/hooks/setting/useDesignSetting";

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

const getSysConfig = () => {
  userStore
    .getSysConfig()
    .then((res) => {
      if (res.code == "200") {
        console.log(res.data);
        storage.set("layout", res.data);
        designStore.setTitle(res.data.title);
      }
    })
    .finally();
};
function handleSubmit() {
  formRef.value
    ?.validate()
    .then(async () => {
      try {
        loading.value = true;
        showLoadingToast("登录中...");
        var p = CryptoJS.MD5(formData.pwd).toString();
        var p = CryptoJS.MD5(p).toString();
        var p = CryptoJS.MD5(p).toString();
        const { code, message: msg } = await userStore.Login({
          account: formData.account,
          pwd: p,
          code: formData.code,
        });
        console.log(code, "code");
        if (code === ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent((route.query?.redirect || "/") as string);
          showSuccessToast("登录成功，即将进入系统");
          // if (route.name === PageEnum.BASE_LOGIN_NAME) {
          //   router.replace("/");
          // } else {
          //   router.replace(toPath);
          // }
          router.push("/");
        } else {
          showFailToast(msg || "登录失败");
        }
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {
      console.error("验证失败");
    });
}

onMounted(() => {
  getSysConfig();
});
</script>

<style scoped lang="less"></style>
