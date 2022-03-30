import * as Koa from 'koa'
import * as koaBody from 'koa-body'

import config from './config'
import router from './router'
import logger from './middlewares/logger'
import * as db from './db'
import { ReqStat } from './stats'
import * as send from'koa-send' // 将静态文件转换成文件流，提供下载功能
import * as path from 'path'
import * as serve from 'koa-static'

const app = new Koa()
app.use(async (ctx, next) => {
  try {
    const start = Date.now()
    await next()
    const time = Date.now() - start
    ctx.set('X-Response-Time', time + 'ms')
  } catch (error) {
    if (error instanceof ReqStat) {
      ctx.status = error.statusCode || 500
      ctx.body = {
        stat: error.stat,
        message: error.msg
      }
    } else {
      console.trace(error)
      ctx.status = 500
      ctx.body = error.message
    }
  }
})
app.use(logger)

app.use(
  koaBody({
    // 支持文件格式
    multipart: true,
    formidable: {
      maxFileSize: config.uploadSizeLimit,
      // 上传目录
      // uploadDir: path.join(__dirname, 'public/uploads'),
      // 保留文件扩展名
      keepExtensions: true
    }
  })
)
app.use(router.routes())
// app.use(serve(path.join(__dirname, 'public')))
db.connect().then(() => {
  app.listen(config.port)
  console.log(config.port)
})
