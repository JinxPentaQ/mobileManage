import type { BasePageResponse, BaseResponse, ListResponse, NoDataResponse } from "./utils";
import { http } from "@/utils/http/axios";


export type PaymentsOrderListResult = BasePageResponse<{
    id: string;
    orderNo: string; //订单号
    mchOrderNo: string; //商户单号
    customerOrderNo: string; //平台单号
    status: number; //订单状态,
    type: number; //订单类型
    channelCurrencyId: string; //通道-币种ID
    channelCurrencyName: string; //通道-币种
    channelId: string; //通道ID
    channelName: string; //通道名称
    channelCode: string; //通道(付款方式)简码
    currencyId: string; //币种ID
    currencyCode: string; //币种简码
    currencyName: string; //币种名称
    createdAt: string; //创建时间
    updatedAt: string; //更新时间
    orderTimeout: string; //订单超时时间
    mchGroupUid: string; //商户GROUP ID
    mchUid: string; //商户ID
    mchUname: string; //商户名称
    mchFeeRate: string; //商户手续费费率 费率描述
    mchFee: string; //商户手续费
    mchAmount: string; //商户订单金额
    customerUid: string; //平台UID
    customerUname: string; //平台名称
    customerFeeRate: string; //平台手续费费率描述
    customerFee: string; //平台手续费
    customerAmount: string; //平台确认金额
    description: string; //备注描述
  }>;
  
  export type PaymentsOrderResult = BaseResponse<{
    id: string;
    orderNo: string; //订单号
    mchOrderNo: string; //商户单号
    customerOrderNo: string; //平台单号
    status: number; //订单状态,
    type: number; //订单类型
    channelCurrencyName: string; //通道-币种
    channelName: string; //通道名称
    channelCode: string; //通道(付款方式)简码
    currencyName: string; //币种名称
    createdAt: string; //创建时间
    updatedAt: string; //更新时间
    orderTimeout: string; //订单超时时间
    mchUname: string; //商户名称
    mchFeeRate: string; //商户手续费费率 费率描述
    mchFee: string; //商户手续费
    mchAmount: string; //商户订单金额
    customerUname: string; //平台名称
    customerFeeRate: string; //平台手续费费率
    customerFee: string; //平台手续费
    customerAmount: string; //平台确认金额
    description: string; //备注描述
    mchNotifyStatus: string; // 商户回调状态://1 pending:进行中; 2 success:成功; 3 failed:失败
    mchNotifyTime: string; // 商户通知时间
    mchNotifyContent: string; // 商户通知内容
    customerPayInfoStatus: number; // 平台订单流转状态
    customerNotifyStatus: string; // 平台回调状态://1 pending:进行中; 2 success:成功; 3 failed:失败
    customerNotifyTime: string; // 平台通知时间
    customerContent: string; // 平台返回内容
    exDescription: string; // 备注描述
  }>;
  export type PaymentsOrderHomeReportResult = ListResponse<{
    label: string;
    value: string;
  }>;
  export type CreatePaymentsOrderResult = BaseResponse<{
    orderNo: string;
  }>;
  export type PaymentsOrderCallbackResult = BaseResponse<{
    msg: string;
  }>;

/**
 * @description: 代付订单
 */
export function getPaymentsOrderList(params: any) {
  return http.request<PaymentsOrderListResult>(
    {
      url: "/payments/list",
      method: "POST",
      params,
    },
    {
      isTransformResponse: false,
    },
  );
}

/**
 * @description: 代付订单详情
 */
export function getPaymentsOrder(params: any) {
  return http.request<PaymentsOrderResult>({
    url: "/payments",
    method: "POST",
    params,
  },
  {
    isTransformResponse: false,
  },);
}
