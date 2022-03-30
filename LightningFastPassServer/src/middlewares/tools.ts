import axios from 'axios'
import * as crypto from 'crypto'

// 加密
export function Sha1(psw: string) {
  const hash = crypto.createHash('sha1')
  hash.update(psw)
  return hash.digest('hex')
}
