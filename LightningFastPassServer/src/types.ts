import { ObjectId, Binary, Long } from 'mongodb'

export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
export interface IFile {
 _id: ObjectId
  key: string
  name: string
  data: Binary
  size: number
  createdAt: Date
}
