import { defineStore } from "pinia";
import { store } from "@/store";
import {
  type PaymentsOrderListResult,
  type PaymentsOrderResult,
  getPaymentsOrder,
  getPaymentsOrderList,
} from "@/api/payment";

export const paymentsOrderStore = defineStore({
  id: "paymentsOrderStore",
  state: () => ({}),
  actions: {
    async getPaymentsOrderList(data) {
      console.log("getOrderList");

      return new Promise<PaymentsOrderListResult>((resolve, reject) => {
        getPaymentsOrderList(data)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async getPaymentsOrder(data) {
      console.log("getCollectionOrder");

      return new Promise<PaymentsOrderResult>((resolve, reject) => {
        getPaymentsOrder(data)
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

export function PaymentsOrderStoreHook() {
    return paymentsOrderStore(store);
  }