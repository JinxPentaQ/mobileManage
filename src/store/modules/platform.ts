import { defineStore } from "pinia";
import { store } from "@/store";
import { type AllPlatformResult, getAllPlatform } from "@/api/platform";

export const platformStore = defineStore({
  id: "platform",
  state: () => ({}),
  actions: {
    async getAllPlatform() {
      console.log("getAllPlatform");

      return new Promise<AllPlatformResult>((resolve, reject) => {
        getAllPlatform()
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

export function PlatformStoreHook() {
  return platformStore(store);
}
