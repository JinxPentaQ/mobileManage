export const baseUrlApi = (url: string) => `/${url}`
export interface BaseResponse<T> {
  code: string
  data: T
  message: string
}
interface BasePage<T> {
  map: (arg0: (item: any) => any) => unknown
  size: number
  total: number
  current: number
  data: T[]
  extra?: ExtarData
}

export interface BasePageResponse<T> {
  code: string
  data: BasePage<T>
  message: string
  extra?: ExtarData
}

export interface ListResponse<T> {
  code: string
  data: T[]
  message: string
}
export interface NoDataResponse {
  data: any
  code: string
  message: string
}

export interface ExtarData {
  totalCount: string
  totalAmount: string
  feeAmount: string
  successFeeAmount: string
  successCount: string
  successAmount: string
  usdt: string
  totalCollectionAmount: string
  totalPaymentsAmount: string
  errorCount: string
  errorAmount: string
  processingCount: string
  processingAmount: string
}
