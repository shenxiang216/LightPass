/*
 * @Author: Deep Lane
 * @Date: 2022-01-11 19:36:43
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-01-30 02:08:59
 * @Description: 
 */
import * as Router from 'koa-router'
import { File } from 'formidable'
import * as path from 'path'
import * as fileService from '../services/file.service'

const router = new Router({
  prefix: '/api/file'
})

/**
 * FormData文件上传
 */
router.post('/upload', async ctx => {
  const file = Object.values(ctx.request.files)[0] as File
  // const basename = path.basename(file.path)
  // ctx.body = { "url": `${ctx.origin}/uploads/${basename}` }
  const key = await fileService.upload(file.path, file.size, file.name)
  ctx.body = {
    stat: 'OK',
    key
  }
})

/**
 * 根据key下载文件
 */
router.get('/download/:key', async ctx => {
  const key = ctx.params.key
  const file = await fileService.find(key)
  ctx.set('Content-Type', 'application/octet-stream')
  ctx.res.setHeader(
    'Content-Disposition',
    'attachment; filename=' + encodeURIComponent(file.name)
  )
  ctx.body = file.data.buffer
})

export default router
