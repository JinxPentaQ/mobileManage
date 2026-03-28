import { defineStore } from 'pinia'
import { store } from '@/store'
import {
  type CollectOrderListResult,
  type CollectOrderResult,
  getCollectOrder,
  getCollectOrderList,
} from '@/api/collection'

export const collectionOrderStore = defineStore({
  id: 'collectionOrder',
  state: () => ({}),
  actions: {
    async getOrderList(data) {
      console.log('getOrderList')

      return new Promise<CollectOrderListResult>((resolve, reject) => {
        getCollectOrderList(data)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async getOrder(data) {
      console.log('getCollectionOrder')

      return new Promise<CollectOrderResult>((resolve, reject) => {
        getCollectOrder(data)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})

export function CollectOrderStoreHook() {
  return collectionOrderStore(store)
}
