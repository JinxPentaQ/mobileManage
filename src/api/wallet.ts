import { http } from "@/utils/http/axios";
import type { BasePageResponse, NoDataResponse } from "./utils";

export type WalletListResult = BasePageResponse<{
  id: string;
  uid: string;
  currencyId: string;
  currencyName: string;
  currencyCode: string;
  balanceFee: string;
  status: string;
  updatedAt: string;
  description: string;
}>;

export type WalletRecordListResult = BasePageResponse<{
  id: string;
  walletId: string;
  createdAt: string;
  currencyId: string;
  currencyName: string;
  startingAmount: string;
  changeAmount: string;
  endingAmount: string;
  type: string;
  direction: string;
  orderNo: string;
  description: string;
}>;

export type withdrawFormatResult = {
  code: string;
  data: string;
  message: string;
};

export const getWalletList = (data?: object) => {
  return http.request<WalletListResult>(
    {
      url: "/wallet/list",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};

export const getWalletRecordList = (data?: object) => {
  return http.request<WalletRecordListResult>(
    {
      url: "/wallet/record",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};

export const changeWallet = (data?: object) => {
  return http.request<NoDataResponse>(
    {
      url: "/wallet/v2/change",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};
export const transferWallet = (data?: object) => {
  return http.request<NoDataResponse>(
    {
      url: "/wallet/transfer",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};

export const withdraw = (data?: object) => {
  return http.request<NoDataResponse>(
    {
      url: "/customer/withdraw",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};

export const withdrawFormat = (data?: object) => {
  return http.request<withdrawFormatResult>(
    {
      url: "/customer/withdraw/format",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};

export const walletExport = (data?: object) => {
  return http.request<WalletRecordListResult>(
    {
      url: "/wallet/record/export",
      method: "POST",
      params: data,
    },
    {
      isTransformResponse: false,
    },
  );
};
