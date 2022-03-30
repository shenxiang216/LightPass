<!--
 * @Author: Deep Lane
 * @Date: 2022-02-23 18:31:57
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-02-23 19:29:21
 * @Description: 
-->
<template>
  <div class="wrapper">
    <div class="nav" v-show="$route.name !== 'Home'">
      <router-link to="home"
        ><van-icon size="40" name="wap-home-o"
      /></router-link>
    </div>
    <h3>关于我们</h3>
    <p>本网站为用户免费提供文件上传和下载服务。无需登录和注册，无需U盘。</p>
    <p>请勿将本网站用于其他用途</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
  setup() {},
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
  flex-direction: column;
  align-items: center;
}
</style>
