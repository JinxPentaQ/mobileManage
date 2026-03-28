import { http } from "@/utils/http/axios";
import { baseUrlApi } from "./utils";
import type { NoDataResponse, BasePageResponse, ListResponse, BaseResponse } from "./utils";

export type PlatformDetailResult = BaseResponse<{
  id: string;
  nickname: string; //昵称
  customerName: string; //用户平台名称
  avatar: string; //头像
  phone: string; //联系方式
  email: string; //email
  account: string; //账号
  type: number; //状态    0禁用 1正常 2限制
  status: number; //状态    0禁用 1正常 2限制
  description: string; //备注描述
  flag: string;
  customerMchNo: string; // 平台商户号
  apiPrivateKey: string; // API秘钥
  configParams: string; // 配置参数
  apiWhiteList: string; // API白名单
  configDescription: string; // 配置描述
  proxyHost: string; // 代理出口地址
  proxyNotifyHost: string; // 代理回调地址
}>;
export type PlatformListResult = BasePageResponse<{
  id: string;
  nickname: string; //昵称
  customerName: string; //用户平台名称
  avatar: string; //头像
  phone: string; //联系方式
  email: string; //email
  account: string; //账号
  type: number; //状态    0禁用 1正常 2限制
  status: number; //状态    0禁用 1正常 2限制
  description: string; //备注描述
}>;
export type AllPlatformResult = ListResponse<{
  id: string;
  nickname: string; //昵称
  customerName: string; //用户平台名称
  avatar: string; //头像
  phone: string; //联系方式
  email: string; //email
  account: string; //账号
  type: number; //状态    0禁用 1正常 2限制
  status: number; //状态    0禁用 1正常 2限制
  description: string; //备注描述
}>;

export type CustomerRateListResult = BasePageResponse<{
  id: string;
  amountFilter: string;
  channelCode: string;
  channelName: string;
  createdAt: string;
  currencyName: string;
  customerChannelCode: string;
  customerCurrencyCode: string;
  customerName: string;
  description: string;
  fixedRate: string;
  isOpen: string;
  maxAmount: string;
  minAmount: string;
  rate: string;
  customerChannelParams: String; //平台对应币种关联
}>;

export function getAllPlatform() {
  return http.request<AllPlatformResult>(
    {
      url: "/customer/all",
      method: "post",
      params: {},
    },
    {
      isTransformResponse: false,
    },
  );
}
