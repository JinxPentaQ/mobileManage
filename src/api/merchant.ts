import { http } from "@/utils/http/axios";
import type { BasePageResponse, ListResponse, BaseResponse } from "./utils";

export type MerchantDetailResult = BaseResponse<{
  id: string;
  mchNo: string;
  mchName: string;
  account: string;
  type: number;
  status: number;
  createdAt: string;
  groupId: string;
  groupName: string;
  parentId: string;
  ancestors: string;
  googleAuth: string;
  whiteList: string;
  description: string;
  apiWhiteList: string;
  cashierUrl: string;
  isReplace: string;
  dailyLimitCollectionAmount: string;
  dailyLimitPaymentsAmount: string;
}>;

export type MerchantListResult = BasePageResponse<{
  id: string;
  mchNo: string;
  mchName: string;
  account: string;
  type: number;
  status: number;
  createdAt: string;
  groupId: string;
  groupName: string;
  parentId: string;
  ancestors: string;
  googleAuth: string;
  whiteList: string;
  description: string;
}>;

export type MerchantRateListResult = BasePageResponse<{
  id: string;
  mchNo: string;
  mchName: string;
  channelCurrencyId: string;
  channelCurrencyName: string;
  channelId: string;
  channelName: string;
  createdAt: string;
  currencyId: string;
  currencyName: string;
  description: string;
  fixedRate: string;
  isOpen: string;
  maxAmount: string;
  mchId: string;
  minAmount: string;
  rate: string;
  specify: Specifies[];
  specifyIds: string;
  specifyName: string;
  type: string;
  updatedAt: string;
}>;

export type Specifies = { customerId: string; customerName: string };

export type MerchantResult = ListResponse<{
  nickName: string;
  id: string;
  mchNo: string;
  mchName: string;
  account: string;
  type: number;
  status: number;
  createdAt: string;
  groupId: string;
  groupName: string;
  parentId: string;
  ancestors: string;
  googleAuth: string;
  whiteList: string;
  description: string;
}>;

export type MerchantRouteItemListResult = BasePageResponse<{
  id: String;
  mchId: String;
  channelCurrencyId: String;
  bizType: Number;
  enabled: Number;
  customerId: String;
  customerName: String;
  groupPriority: Number;
  weight: Number;
  amountFilter: String;
  remark: String;
  createdAt: String;
  updatedAt: String;
}>;
export const getList = (data?: object) => {
  return http.request<MerchantListResult>(
    {
      url: "/merchant/list",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};

export const getMerchantDetail = (data?: object) => {
  return http.request<MerchantDetailResult>(
    {
      url: "/merchant",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};
export function getAllMerchant() {
  return http.request<MerchantResult>(
    {
      url: "/merchant/all",
      method: "GET",
      params: {},
    },
    {
      isTransformResponse: false,
    },
  );
}

export const getMerchantRateConfigList = (data?: object) => {
  return http.request<MerchantRateListResult>(
    {
      url: "/merchant/channel/config",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};