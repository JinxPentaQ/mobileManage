import { defineStore } from "pinia";
import { store } from "@/store";
import {
  type withdrawFormatResult,
  type WalletListResult,
  type WalletRecordListResult,
  changeWallet,
  transferWallet,
  getWalletList,
  getWalletRecordList,
  withdraw,
  withdrawFormat,
  walletExport,
} from "@/api/wallet";
import type { NoDataResponse } from "@/api/utils";

export const walletStore = defineStore({
  id: "htpay-wallet",
  state: () => ({}),
  actions: {
    async getWalletList(data) {
      console.log("getWalletList");

      return new Promise<WalletListResult>((resolve, reject) => {
        getWalletList(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async getWalletRecordList(data) {
      console.log("getWalletRecordList");

      return new Promise<WalletRecordListResult>((resolve, reject) => {
        getWalletRecordList(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async changeWallet(data) {
      console.log("changeWallet");

      return new Promise<NoDataResponse>((resolve, reject) => {
        changeWallet(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async transferWallet(data) {
      console.log("transferWallet");

      return new Promise<NoDataResponse>((resolve, reject) => {
        transferWallet(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async withdraw(data) {
      console.log("withdraw");

      return new Promise<NoDataResponse>((resolve, reject) => {
        withdraw(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async withdrawFormat(data) {
      console.log("withdrawFormat");

      return new Promise<withdrawFormatResult>((resolve, reject) => {
        withdrawFormat(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async walletExport(data) {
      console.log("walletExport");

      return new Promise<WalletRecordListResult>((resolve, reject) => {
        walletExport(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export function WalletStoreHook() {
  return walletStore(store);
}
