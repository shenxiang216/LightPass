import * as Router from 'koa-router'

import fileRouter from './routers/file.router'
const router = new Router()
router.use(fileRouter.routes())
export default router
