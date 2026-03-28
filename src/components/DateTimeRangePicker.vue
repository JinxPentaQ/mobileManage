<template>
  <div class="date-time-range-picker">
    <div class="flex items-center justify-around">
      <!-- 开始时间输入框 -->
      <van-field
        v-model="startTimeLabel"
        readonly
        placeholder="开始时间"
        @click="openPicker('start')"
      />
      <div class="ml-3 mr-3">-</div>
      <!-- 结束时间输入框 -->
      <van-field
        v-model="endTimeLabel"
        readonly
        placeholder="结束时间"
        @click="openPicker('end')"
      />
    </div>

    <!-- 选择器弹窗 -->
    <van-popup v-model:show="showPopup" position="bottom" round :style="{ height: '50%' }">
      <van-picker-group
        title="选择日期时间"
        :tabs="['日期', '时间']"
        @confirm="onConfirm"
        @cancel="showPopup = false"
      >
        <!-- 日期选择器 -->

        <van-date-picker
          v-model="currentDate"
          :min-date="minDate"
          :max-date="maxDate"
          @change="onDateChange"
        />
        <van-time-picker
          v-model="currentTime"
          :columns-type="['hour', 'minute', 'second']"
          :min-hour="0"
          :max-hour="23"
          :min-minute="0"
          :max-minute="59"
          :min-second="0"
          :max-second="59"
          @change="onTimeChange"
        />
      </van-picker-group>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { showToast } from "vant";

// --- Props & Emits ---
const props = defineProps({
  modelValue: {
    type: Array,
  },
  minDate: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 10);
      return date;
    },
  },
  maxDate: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 10);
      return date;
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

// --- State ---
const showPopup = ref(false);
const currentType = ref("start"); // 'start' | 'end'

// 内部用于 Picker 绑定的值 (数组格式: ['2023-01-01', '12:00'])
const currentDate = ref([]);
const currentTime = ref([]);

// 显示在 Input 框中的字符串
const startTimeLabel = computed(() => props.modelValue[0]);
const endTimeLabel = computed(() => props.modelValue[1]);
// 临时存储即将选中的完整时间戳，用于校验
let tempSelectedTimestamp = null;

// --- Methods ---

// 打开弹窗
function openPicker(type) {
  currentType.value = type;
  showPopup.value = true;
  // 初始化 Picker 的值
  const targetTimeStr = type === "start" ? props.modelValue[0] : props.modelValue[1];

  if (targetTimeStr) {
    const datePart = targetTimeStr.split(" ")[0];
    const timePart = targetTimeStr.split(" ")[1] || "00:00:00";

    // 解析日期为 YYYY-MM-DD 数组供 van-date-picker 使用
    currentDate.value = datePart.split("-");
    // 解析时间为 HH:mm 数组供 van-time-picker 使用
    currentTime.value = timePart.split(":");
  } else {
    // 如果没有值，默认使用当前时间
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    currentDate.value = [yyyy, mm, dd];
    currentTime.value = type === "start" ? ["00", "00", "00"] : ["23", "59", "59"];
  }
}

// 监听日期或时间变化，实时计算完整时间戳用于后续校验（可选优化：也可以只在 confirm 时计算）
function calculateTempTimestamp() {
  if (!currentDate.value.length || !currentTime.value.length) {
    return null;
  }
  const dateStr = currentDate.value.join("-");
  const timeStr = currentTime.value.join(":");
  const fullStr = `${dateStr} ${timeStr}`;
  return new Date(fullStr).getTime();
}

function onDateChange() {
  tempSelectedTimestamp = calculateTempTimestamp();
}

function onTimeChange() {
  tempSelectedTimestamp = calculateTempTimestamp();
}

// 确认选择
function onConfirm() {
  // if (!tempSelectedTimestamp) {
  //   showToast("时间格式错误");
  //   return;
  // }

  const startVal = props.modelValue[0];
  const endVal = props.modelValue[1];

  const startTs = startVal ? new Date(startVal).getTime() : null;
  const endTs = endVal ? new Date(endVal).getTime() : null;

  // 校验逻辑
  if (currentType.value === "start") {
    // 如果选了开始时间，且已有结束时间，则 开始 < 结束
    if (endTs && tempSelectedTimestamp >= endTs) {
      showToast("开始时间必须早于结束时间");
      return; // 阻止关闭
    }
  } else {
    // 如果选了结束时间，且已有开始时间，则 结束 > 开始
    if (startTs && tempSelectedTimestamp <= startTs) {
      showToast("结束时间必须晚于开始时间");
      return; // 阻止关闭
    }
  }

  // 校验通过，格式化输出
  const dateStr = currentDate.value.join("-");
  const timeStr = currentTime.value.join(":");
  const finalValue = `${dateStr} ${timeStr}`;

  // 更新父组件数据
  const newValue = [...props.modelValue];
  if (currentType.value === "start") {
    newValue[0] = finalValue;
  } else {
    newValue[1] = finalValue;
  }

  emit("update:modelValue", newValue);
  showPopup.value = false;
}
</script>

<style scoped>
/* 确保 picker-group 内的两个 picker 平分宽度或按需调整 */
:deep(.van-picker-group__content) {
  display: flex;
}
:deep(.van-date-picker),
:deep(.van-time-picker) {
  flex: 1;
}
</style>
