<!--
 * @Author: Deep Lane
 * @Date: 2022-01-12 19:37:49
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-02-23 19:25:34
 * @Description: 
-->
<template>
  <router-view></router-view>
  
</template>
<script lang="ts">
import { defineComponent } from "vue"
import Top from "./views/Top.vue"
export default defineComponent({
  components: {
    Top,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px;

    &.router-link-exact-active {
      color: var(--el-color-primary);
    }
  }
}
.nav {
  padding:2px;
  font-size: 30px;
}

</style>
