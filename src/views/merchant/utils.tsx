import { ref } from "vue";

const merchantStatusList = ref([
  {
    status: 0,
    color: "danger",
    text: "禁用"
  },
  {
    status: 1,
    color: "success",
    text: "正常"
  },
  {
    status: 2,
    color: "warning",
    text: "限制"
  }
]);
export const merchantTypeList = ref([
  {
    status: "",
    color: "success",
    text: "全部"
  },
  {
    status: 1,
    color: "danger",
    text: "代收"
  },
  {
    status: 2,
    color: "success",
    text: "代付"
  },
  {
    status: 3,
    color: "primary",
    text: "收付一体"
  }
]);
export const isReplaceList = ref([
  {
    status: 0,
    text: "不允许"
  },
  {
    status: 1,
    text: "允许"
  }
]);
export const siwtchList = ref([
  {
    status: 0,
    text: "关闭",
    color: "danger"
  },
  {
    status: 1,
    text: "开启",
    color: "success"
  }
]);

export const groupList = ref([
  {
    status: 1,
    text: "1"
  },
  {
    status: 2,
    text: "2"
  },
  {
    status: 3,
    text: "3"
  }
]);
export const bizTypeList = ref([
  {
    status: 1,
    color: "danger",
    text: "代收"
  },
  {
    status: 2,
    color: "success",
    text: "代付"
  }
]);
export const modeTypeList = ref([
  {
    status: 1,
    text: "权重",
    color: ""
  },
  {
    status: 2,
    text: "权重+主副",
    color: "success"
  }
]);
export const MerchantStatusTag = status => {
  return merchantStatusList.value.find(item => item.status === status);
};
export const MerchantTypeTag = status => {
  return merchantTypeList.value.find(item => item.status === status);
};
export const MerchantSwitchkTag = status => {
  const s = siwtchList.value.find(item => item.status == status);
  return s ? s : siwtchList.value[0];
};
export const MerchantGroupListTag = status => {
  const s = groupList.value.find(item => item.status == status);
  return s ? s : groupList.value[0];
};

export const MerchantBizTypeTag = status => {
  const s = bizTypeList.value.find(item => item.status === status);
  return s ? s : bizTypeList.value[0];
};
export const MerchantModeTypeTag = status => {
  const s = modeTypeList.value.find(item => item.status === status);
  return s ? s : modeTypeList.value[0];
};
