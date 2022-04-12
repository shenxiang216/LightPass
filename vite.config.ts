import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import styleImport, { VantResolve } from "vite-plugin-style-import"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: false, //自动打开
    base: "./ ", //生产环境路径
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      "^/api": {
        target: "http://localhost:3001", // 后端服务实际地址
        changeOrigin: true, //开启代理
        // rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },

  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
})
