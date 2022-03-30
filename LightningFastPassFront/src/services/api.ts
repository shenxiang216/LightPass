/*
 * @Author: Deep Lane
 * @Date: 2022-01-14 16:45:27
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-02-23 22:35:19
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
 * 下载文件
 * @param key 文件的key
 *
 * @returns
 */
export async function download(key: string) {
  return request.getFile<any>("/api/file/download/" + key)
}
