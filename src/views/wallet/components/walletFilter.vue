<template>
    <van-popup
      v-model:show="localShow"
      :position="position"
      :round="round"
      :style="{ height: '30%' }"
      @close="handleClose"
    >
      <div class="card flex flex-col">
        <van-field v-model="requestParams.orderNo" label="单号" placeholder="请输入内部单号" />
        <van-field v-model="requestParams.amount" label="金额" placeholder="请输入金额" />
        <DateTimeRangePicker v-model="requestParams.date" />
      </div>
      <div class="ml-3 mr-3 flex">
        <van-button class="flex-1" type="warning" square @click="onReset"> 重置 </van-button>
        <van-button class="flex-1" type="primary" square @click="onSubmit"> 确认 </van-button>
      </div>
    </van-popup>
  </template>
  
  <script setup>
  // 定义 Props
  const props = defineProps({
    // 接收显示状态
    show: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "center",
    },
    round: {
      type: Boolean,
      default: false,
    },
    requestParams: {
      type: Object,
      required: true,
    },
    platformformData: {
      type: Array,
      default: [],
    },
    merchantformData: {
      type: Array,
      default: [],
    },
  });
  // 定义 Emits
  const emit = defineEmits(["update:show", "close", "confrim", "reset"]);
  // 计算属性：实现双向绑定的核心
  // 读取 props.show，写入时触发 update:show 事件
  const localShow = computed({
    get: () => props.show,
    set: (val) => {
      emit("update:show", val);
    },
  });
  
  // 处理关闭逻辑
  function handleClose() {
    // 触发更新事件，将值设为 false
    emit("update:show", false);
    // 同时触发 close 事件供父组件做其他逻辑
    emit("close");
  }
  
  function onSubmit() {
    // 触发更新事件，将值设为 false
    emit("update:show", false);
    emit("confrim", props.requestParams);
  }
  
  function onReset() {
    // 触发更新事件，将值设为 false
    emit("update:show", false);
    emit("reset");
  }
  
  onMounted(() => {
   
  });
  </script>
  
  <style scoped lang="less">
  .card {
    margin-bottom: 8px;
    font-size: 12px;
    color: #323233;
  }
  
  .item {
    display: flex;
    height: 20px;
    align-items: center;
    margin-right: 4px;
  }
  
  .item-label {
    color: #a2a2a7;
    font-weight: 400;
    line-height: 14px;
  }
  </style>
  