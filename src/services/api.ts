/*
 * @Author: Deep Lane
 * @Date: 2022-01-14 16:45:27
 * @LastEditors: 赵亚鑫Deep Lane
 * @LastEditTime: 2022-04-12 20:58:53
 * @Description: 
 */
import * as request from "./request"
import { IFile } from "../types"

interface BaseRes {
  stat: string
  message?: string
}

interface uploadFileRes extends BaseRes {
  key?: string
}

interface downloadFileRes extends BaseRes {
  key: string
}

/**
 * 上传文件
 * @param file formdata类型文件
 *
 * 
 */
export async function upload(file: FormData) {
  return request.post<uploadFileRes>("/api/file/upload", file)
}
/**
 * 判断文件是否存在
 * @param key 文件key
 * @returns 
 */
 export async function exist(key: string) {
  return request.post<BaseRes>("/api/file/exist/" + key)
}
/**
 * 下载文件
 * @param key 文件的key
 *
 * @returns
 */
export async function download(key: string) {
  return request.getFile<BaseRes>("/api/file/download/" + key)
}
