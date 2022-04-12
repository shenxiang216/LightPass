<!--
 * @Author: Deep Lane
 * @Date: 2022-01-13 15:29:59
 * @LastEditors: 赵亚鑫Deep Lane
 * @LastEditTime: 2022-04-12 21:33:35
 * @Description: 
-->
<template>
  <div class="wrapper">
    <div class="logo">
      <section class="frozen" data-heading="Frozen">Light|闪电速传</section>
    </div>
    <van-button
      @click="about"
      color="#d0eeff"
      class="about"
      icon="https://img.yzcdn.cn/vant/user-active.png"
      type="primary"
    >
      关于我们
    </van-button>
    <div v-show="showkey" class="show">
      {{ keywords }}
      <span
        class="copy-code-button"
        :data-clipboard-text="keywords"
        @click="copy"
      >
        复制
      </span>
    </div>
    <!-- 隐藏的input file -->
    <input
      type="file"
      @change="uploadFile"
      ref="fileInput"
      style="opacity:0;"
    />
    <div class="btn">
      <div class="file" @click="clickUpload">上传文件</div>
      <van-field
        v-model="key"
        label="提取码"
        left-icon="smile-o"
        right-icon="warning-o"
        placeholder="输入文件提取码"
      />
      <div class="file" @click="downloadFile">接收文件</div>
    </div>
    <!-- <div class="updown">
      上传区域
    </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import { upload, download, exist } from "../services/api"
import Clipboard from "clipboard"
import { Toast } from "vant"
import { useRouter, useRoute } from "vue-router"

import { CountStorage } from "../utils/index"
export default defineComponent({
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null)
    const router = useRouter()
    const route = useRoute()
    const key = ref<string>("")
    const showkey = ref<boolean>(false)
    const keywords = ref<string>(
      "上传的文件提取码为:ca7c04,访问light.mmyxyz,xyz提取文件,24h后自动删除,不保留任何个人资料,闪电速传——无需登录和注册,免费轻松快传轻文件 "
    )
    const clickUpload = () => {
       console.log(1)
      if (fileInput.value) {
        console.log(2)
        fileInput.value.click()
      }
    }
    const uploadFile = async (e: Event) => {
     console.log(3)
      if (!CountStorage(new Date())) {
        Toast.fail("单日上传下载限制为10次,明日再试吧！")
        return
      }
      // 断言为HTMLInputElement
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        Toast.loading({
          message: "上传中...",
          forbidClick: true,
          duration: 10000,
        })
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append("file", uploadedFile)
        try {
          const res = await upload(formData)
          if (res.stat === "OK") {
            keywords.value = `文件上传成功,提取码为:${res.key},访问light.mmyxyz,xyz提取文件,24h后自动删除,不保留任何个人资料,闪电速传——无需登录和注册,免费轻松快传轻文件`
            showkey.value = true
            Toast.clear()
            Toast.success("上传成功")
            // 清空input
            target.value = ""
            return
          }
          Toast.fail("网络错误")
          // 清空input
          target.value = ""
          return
        } catch {
          Toast.clear()
          Toast.fail("上传失败")
          // 清空input
          target.value = ""
        }
      }
    }
    const copy = () => {
      let clipboard = new Clipboard(".copy-code-button") // 这里可以理解为选择器，选择上面的复制按钮
      clipboard.on("success", (e) => {
        Toast("复制成功")
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on("error", (e) => {
        // 不支持复制
        Toast("手机权限不支持复制功能")
        // 释放内存
        clipboard.destroy()
      })
    }
    const downloadFile = async () => {
      if (!CountStorage(new Date())) {
        Toast.fail("单日上传下载限制为10次,明日再试吧！")
        return
      }
      if (key.value === "") {
        Toast.fail("请先输入提取码")
        return
      }
      const res = await exist(key.value)
      if (res.stat === "ERR_NOT_FOUND") {
        Toast.fail("提取码错误或上传文件已过期！")
        return
      }
      await download(key.value)
    }
    const about = () => {
      console.log(route.name)
      router.push({ path: "/about" })
    }
    return {
      fileInput,
      key,
      keywords,
      showkey,
      clickUpload,
      uploadFile,
      downloadFile,
      copy,
      about,
    }
  },
})
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: linear-gradient(
    -50deg,
    #f7a37b,
    #f7a37b,
    #ffdea8,
    #ffdea8,
    #d0e4b0,
    #d0e4b0,
    #7cc5d0,
    #7cc5d0,
    #00a2e1,
    #00a2e1,
    #0085c8,
    #0085c8
  );
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.logo {
  position: absolute;
  top: 0;
}
/* 设置自定义字体 */
// @font-face {
//   font-family: "frozen";
//   src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/Ice%20kingdom%20-%20Bold%20-%20Por%20Kustren.woff");
// }
.frozen {
  top: 0 px;
  /* 最初字体样式 */
  font-size: 50px;
  font-weight: 900;
  /* 使用自定义字体 */
  font-family: "frozen", serif;
  /* 设置背景图片 */
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/6963bbf342d87b3a2150bd8f59682b89.jpg);
  /* 设置文字透明且背景按文字区域裁剪 */
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  /* 为了子元素定位 */
  position: relative;
}
.frozen::before {
  border-radius: 20px;
  /* 获取自定义属性文字 */
  content: attr(data-heading);
  /* 使其和父元素文字重叠 */
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  /* 使用颜色混合模式 */
  mix-blend-mode: screen;
  /* 文字透明 */
  color: transparent;
  /* 设置文字阴影 */
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2), -2px 2px 10px rgba(0, 0, 0, 0.2),
    -2px -2px 10px rgba(0, 0, 0, 0.2);
  /* 设置渐变背景 */
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 45%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 55%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200%;
  /* 使用背景图动画 */
  animation: glare 1s infinite;
}
/* 设置背景图动画 */
@keyframes glare {
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 100%;
  }
}
.glare {
  /* 初始样式 */
  width: 500px;
  height: 300px;
  border: 1px solid #333;
  /* 设置渐变背景 */
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0) 45%,
    rgba(0, 0, 0, 0.8) 50%,
    rgba(0, 0, 0, 0) 55%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: 200%;
  /* 使用背景图动画 */
  animation: glare 1s infinite;
}

.copy-code-button {
  cursor: pointer;
  color: #00a2e1;
  border: 1px solid #7cc5d0;
  border-radius: 20%;
}
.updown {
  flex: 1;
  width: 100%;
  border: 1px solid;
}
.btn {
  height: 20%;
}
.file {
  cursor: pointer;
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 50px;
  margin: 10px;
  width: 150px;
  font-size: 25px;
}
.file input {
  cursor: pointer;
  position: absolute;

  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
.about {
  position: absolute;
  top: 70px;
  color: #1e88c7;
}
</style>
