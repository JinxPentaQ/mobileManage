import { ref } from "vue";

export const walletRecordTypeList = ref([
  {
    type: 1,
    text: "管理员变更扣除"
  },
  {
    type: 2,
    text: "管理员变更添加"
  },
  {
    type: 3,
    text: "管理员划出"
  },
  {
    type: 4,
    text: "管理员划入"
  },
  {
    type: 5,
    text: "管理员上分"
  },
  {
    type: 6,
    text: "管理员下发"
  },
  {
    type: 7,
    text: "商户管理员划出"
  },
  {
    type: 8,
    text: "商户管理员划入"
  },
  {
    type: 10,
    text: "商户代收入账"
  },
  {
    type: 11,
    text: "商户代收手续费扣除"
  },
  {
    type: 12,
    text: "商户代收失败退还"
  },
  {
    type: 13,
    text: "商户代收失败手续费退还"
  },
  {
    type: 30,
    text: "平台代收入账"
  },
  {
    type: 31,
    text: "平台代收手续费入账"
  },
  {
    type: 32,
    text: "平台代收失败退还"
  },
  {
    type: 33,
    text: "客户代收失败手续费退还"
  },
  {
    type: 50,
    text: "商户代付扣款"
  },
  {
    type: 51,
    text: "商户代付手续费扣款"
  },
  {
    type: 52,
    text: "商户代付失败退款"
  },
  {
    type: 53,
    text: "商户代付失败退还手续费"
  },
  {
    type: 80,
    text: "平台代付扣款"
  },
  {
    type: 81,
    text: "平台代付手续费入账"
  },
  {
    type: 82,
    text: "平台代付失败退款"
  },
  {
    type: 83,
    text: "平台代付失败手续费退还"
  }
]);

export const walletRecordDirectionList = ref([
  {
    direction: 1,
    color: "success",
    text: "收入"
  },
  {
    direction: 2,
    color: "danger",
    text: "支出"
  }
]);

export const walletTypeList = ref([
  {
    type: "COLLECTION",
    color: "#00a870",
    text: "代收"
  },
  {
    type: "PAYMENTS",
    color: "#00a111",
    text: "代付"
  },
  {
    type: "FREEZE",
    color: "#00a111",
    text: "冻结"
  }
]);

export const walletChangeTypeList = ref({
  COLLECTION: [
    {
      value: "2",
      label: "下发"
    },
    {
      value: "3",
      label: "人工调账"
    }
  ],
  PAYMENTS: [
    {
      value: "1",
      label: "上分"
    },
    {
      value: "2",
      label: "下发"
    },
    {
      value: "3",
      label: "人工调账"
    }
  ]
});

export const wallectChangeTypeListAll = ref([
  {
    value: "1",
    label: "上分"
  },
  {
    value: "2",
    label: "下发"
  },
  {
    value: "3",
    label: "人工调账"
  }
]);

export const WalletRecordTypeTag = type => {
  var r = walletRecordTypeList.value.find(item => item.type == type);
  console.log("WalletRecordTypeTag " + JSON.stringify(r));
  if (r == undefined || r == null) {
    return walletRecordTypeList.value.find(item => item.type == 0);
  }
  return r;
};

export const WalletRecordDirectionTag = direction => {
  var r = walletRecordDirectionList.value.find(
    item => item.direction == direction
  );
  return r;
};

export const walletTypeItem = value => {
  var r = walletTypeList.value.find(item => item.type == value);
  return r;
};

export const WalletChangeType = type => {
  if (type === "") {
    return [];
  }
  return walletChangeTypeList.value[type];
};
export interface DetailForm {
  name: string;
  title: string;
  fromWalletType: string;
  toWalletType: string;
  amount: any;
  type: string;
  rate: string;
  usdt: any;
  code: string;
  desc: string;
}

export interface DetailFormProps {
  data?: DetailForm;
}
