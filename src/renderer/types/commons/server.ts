export interface SelectListResult<T = any> {
  rows: Array<T>
  count: number
  remark?: string
}

export interface SelectOneResult<T = any> {
  data: T
  remark?: string
}

export interface InsertOneResult {
  insertedId: number
  remark?: string
}

export interface UpdateCountResult {
  updatedCount: number
  remark?: string
}

export interface DeleteCountResult {
  deletedCount: number
  remark?: string
}
