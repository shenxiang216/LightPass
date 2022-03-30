/*
 * @Author: Deep Lane
 * @Date: 2022-01-11 19:36:43
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-01-30 20:23:23
 * @Description: 
 */
import { MongoClient, Collection, WithId } from 'mongodb'

import config from './config'
import { IFile } from './types'

let client: MongoClient
export let fileCollection: Collection<WithId<IFile>>
export async function connect() {
  client = await MongoClient.connect(`mongodb://${config.mongo_host}`)
  const db = client.db(config.mongo_db)
  fileCollection = db.collection('files')
  // 创建ttl索引
  fileCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 })
}
