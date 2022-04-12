/*
 * @Author: Deep Lane
 * @Date: 2022-01-12 19:37:49
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-02-23 19:18:56
 * @Description: 
 */
import { createApp } from "vue"
import App from "./App.vue"
import router from './router'
import { Button, Field, CellGroup,Toast,Icon } from "vant"
const app = createApp(App)
app.use(Field)
app.use(CellGroup)
app.use(Button).use(Toast).use(Icon).use(router).mount("#app")
