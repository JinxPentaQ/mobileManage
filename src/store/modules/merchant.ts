import { defineStore } from "pinia";
import { store } from "@/store";
import {
  type MerchantResult,
  type MerchantDetailResult,
  type MerchantListResult,
  getAllMerchant,
  getList,
  getMerchantDetail,
  MerchantRateListResult,
  getMerchantRateConfigList,
} from "@/api/merchant";

export const merchantStore = defineStore({
  id: "merchant",
  state: () => ({}),
  actions: {
    async getMerchantList(data) {
      console.log("getMerchantList");

      return new Promise<MerchantListResult>((resolve, reject) => {
        getList(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getMerchantDetail(data) {
      console.log("getMerchantDetail");

      return new Promise<MerchantDetailResult>((resolve, reject) => {
        getMerchantDetail(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getAllMerchant() {
      console.log("getAllMerchant");

      return new Promise<MerchantResult>((resolve, reject) => {
        getAllMerchant()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getMerchantRateList(data) {
      console.log("getMerchantRateList");

      return new Promise<MerchantRateListResult>((resolve, reject) => {
        getMerchantRateConfigList(data)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
});

export function MerchantStoreHook() {
  return merchantStore(store);
}
