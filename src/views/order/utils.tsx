import { ref } from "vue";

export const collectionStatusList = ref([
  {
    value: 10,
    text: "预创建",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 11,
    text: "待接单",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 21,
    text: "待付款",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 22,
    text: "付款中",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 23,
    text: "待完成",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 30,
    text: "准备处理回调",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 31,
    text: "支付成功",
    color: "#e3f9e9",
    textColor: "#2BC155"
  },
  {
    value: 32,
    text: "超时关闭",
    color: "#FEF0F0",
    textColor: "#FF4D4F"
  },
  {
    value: 33,
    text: "支付失败",
    color: "#FEF0F0",
    textColor: "#FF4D4F"
  },
  {
    value: 34,
    text: "平台下单失败",
    color: "#FEF0F0",
    textColor: "#FF4D4F"
  },
  {
    value: 35,
    text: "下单失败",
    color: "#FEF0F0",
    textColor: "#FF4D4F"
  }
]);

export const paymentsStatusList = ref([
  {
    value: 10,
    text: "预创建",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 21,
    text: "待下单",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 22,
    text: "待完成",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 23,
    text: "待确认",
    color: "#cfeffa",
    textColor: "#0faee5"
  },

  {
    value: 30,
    text: "准备处理回调",
    color: "#cfeffa",
    textColor: "#0faee5"
  },
  {
    value: 31,
    text: "支付成功",
    color: "#e3f9e9",
    textColor: "#2BC155"
  },
  {
    value: 32,
    text: "超时关闭",
    color: "#FEF0F0",
    textColor: "#FF4D4F"
  },
  {
    value: 33,
    text: "支付失败",
    color: "#FEF0F0",
    textColor: "#FF4D4F"
  },
  {
    value: 34,
    text: "未匹配到支付平台",
    color: "#FEF0F0",
    textColor: "#FF4D4F"
  },
  {
    value: 35,
    text: "下单失败",
    color: "#FEF0F0",
    textColor: "#FF4D4F"
  }
]);

export const CollectionStatusTag = value => {
  return collectionStatusList.value.find(item => item.value === value);
};

export const PaymentsStatusTag = value => {
  return paymentsStatusList.value.find(item => item.value === value);
};

export const ReportTypeList = ref([
  {
    value: 1,
    text: "商户"
  },
  {
    value: 2,
    text: "平台"
  },
  {
    value: 3,
    text: "通道"
  }
]);

export const shortcuts = [
  {
    text: "今天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate());
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    }
  },
  {
    text: "昨天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    }
  },
  {
    text: "前天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 2);
      end.setDate(end.getDate() - 2);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    }
  },
  {
    text: "最近3天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 2);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    }
  },
  {
    text: "最近5天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 4);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    }
  },
  {
    text: "最近7天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    }
  },
  {
    text: "最近15天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 14);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    }
  }
];
