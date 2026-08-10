import { MongoClient, Collection, WithId } from 'mongodb'

import config from './config'
import { IFile } from './types'

let client: MongoClient
export let fileCollection: Collection<WithId<IFile>>
export async function connect() {
  client = await MongoClient.connect(`mongodb://${config.mongo_host}`, {
    authSource: 'admin', // 必填，一般是admin
    auth: {
      username: 'feed',
      password: 'Abc123++'
    }
  })
  const db = client.db(config.mongo_db)
  fileCollection = db.collection('files')
  // 创建ttl索引
  fileCollection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 })
}
