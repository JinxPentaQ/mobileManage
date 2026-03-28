<template>
  <div class="custom-picker-container">
    <!-- 1. 输入框区域 -->
    <van-field
      v-model="displayText"
      :label="label"
      :placeholder="placeholder"
      readonly
      :name="name"
      :rules="rules"
      :required="required"
      :clearable="clearable"
      :right-icon="showPicker ? 'cross' : 'arrow'"
      @click="showPicker = true"
      @click-right-icon="showPicker = false"
    >
      <template v-if="$slots.label" #label>
        <slot name="label" />
      </template>
    </van-field>

    <!-- 2. 弹出层 + 选择器 -->
    <van-popup
      v-model:show="showPicker"
      position="bottom"
      round
      :style="{ height: '50%' }"
    >
      <van-picker
        v-model="pickerModelValue"
        :columns="options"
        :title="pickerTitle"
        :loading="loading"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Field, Picker, Popup } from 'vant'

const props = defineProps({
  modelValue: [String, Number], // 父组件传入的是 字符串 或 数字
  options: { type: Array, required: true },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '请选择' },
  name: { type: String, default: '' },
  rules: { type: Array, default: () => [] },
  required: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  pickerTitle: { type: String, default: '请选择' },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const showPicker = ref(false)

//
const pickerModelValue = ref([])

// 监听外部 props.modelValue 变化，同步到内部数组
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== null && newVal !== undefined) {
      // 将 "110000" 转换为 ["110000"]
      pickerModelValue.value = [newVal]
    }
    else {
      pickerModelValue.value = []
    }
  },
  { immediate: true }, // 初始化时立即执行一次
)

// 计算属性：显示文本
const displayText = computed(() => {
  // 回显已经修改过的值
  const currentValue = props.modelValue

  if (!props.options || !currentValue) {
    return ''
  }

  const item = props.options.find(op => op.value === currentValue)
  return item ? item.text : ''
})

function onConfirm({ selectedOptions }) {
  // selectedOptions[0]?.value 获取选中的值
  const value = selectedOptions[0]?.value
  const text = selectedOptions[0]?.text

  // 发射字符串/数字给父组件，而不是数组
  emit('update:modelValue', value)
  emit('confirm', { value, text, selectedOptions })
  showPicker.value = false
}

function onCancel() {
  emit('cancel')
  showPicker.value = false
}
</script>
