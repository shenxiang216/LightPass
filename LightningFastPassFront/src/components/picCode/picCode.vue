<!--
 * @Author: Deep Lane
 * @Date: 2022-01-29 21:13:30
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-01-29 22:42:59
 * @Description: 
-->
<template>
  <div
    class="yzcode"
    @click="OnRefresh()"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <p ref="picyzm"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue"
import { IVerify } from "../../types"
export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 30,
    },
  },
  setup(props, context) {
    function GVerify(option: IVerify) {
      // 创建一个图形验证码对象，接收options对象为参数
      let options: IVerify = {
        // 默认options参数值
        id: "",
        canvasId: "verifyCanvas",
        width: 100,
        height: 30,
        type: "blend",
        code: "",
        con: null,
        numArr: [],
        letterArr: [],
      }
      /** 生成字母数组* */
      const getAllLetter = () => {
        let letterStr =
          "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"
        return letterStr.split(",")
      }
      if (Object.prototype.toString.call(options) == "[object Object]") {
        options = { ...option }
      } else {
        options.id = option.id
      }
      options.numArr =
        "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(
          ","
        )
      options.letterArr = getAllLetter()
      /** 初始化方法* */
      const _init = () => {
        // let con = document.getElementById(options.id);
        let con = options.con
        let canvas = document.createElement("canvas")
        options.width = con.offsetWidth > 0 ? con.offsetWidth : options.width
        options.height =
          con.offsetHeight > 0 ? con.offsetHeight : options.height
        canvas.id = options.canvasId
        canvas.width = options.width
        canvas.height = options.height
        canvas.style.cursor = "pointer"
        canvas.innerHTML = "您的浏览器版本不支持canvas"
        con.appendChild(canvas)
        // let parent = this
        // canvas.onclick = function () {
        //     parent.refresh();
        // }
      }

      /** 生成验证码* */
      const refresh = () => {
        options.code = ""
        let canvas = document.getElementById(options.canvasId) as any
        if (!canvas.getContext) {
          return
        }
        let ctx = canvas.getContext("2d")
        ctx.textBaseline = "middle"

        ctx.fillStyle = randomColor(180, 240)
        ctx.fillRect(0, 0, options.width, options.height)
        let txtArr
        if (options.type == "blend") {
          // 判断验证码类型
          txtArr = options.numArr.concat(options.letterArr)
        } else if (options.type == "number") {
          txtArr = options.numArr
        } else {
          txtArr = options.letterArr
        }

        for (let i = 1; i <= 4; i++) {
          let txt = txtArr[randomNum(0, txtArr.length)]
          options.code += txt
          ctx.font = randomNum(options.height / 2, options.height) + "px SimHei" // 随机生成字体大小
          ctx.fillStyle = randomColor(50, 160) // 随机生成字体颜色
          ctx.shadowOffsetX = randomNum(-3, 3)
          ctx.shadowOffsetY = randomNum(-3, 3)
          ctx.shadowBlur = randomNum(-3, 3)
          ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
          let x = (options.width / 5) * i
          let y = options.height / 2
          let deg = randomNum(-30, 30)
          /** 设置旋转角度和坐标原点* */
          ctx.translate(x, y)
          ctx.rotate((deg * Math.PI) / 180)
          ctx.fillText(txt, 0, 0)
          /** 恢复旋转角度和坐标原点* */
          ctx.rotate((-deg * Math.PI) / 180)
          ctx.translate(-x, -y)
        }
        /** 绘制干扰线* */
        for (let i = 0; i < 4; i++) {
          ctx.strokeStyle = randomColor(40, 180)
          ctx.beginPath()
          ctx.moveTo(randomNum(0, options.width), randomNum(0, options.height))
          ctx.lineTo(randomNum(0, options.width), randomNum(0, options.height))
          ctx.stroke()
        }
        /** 绘制干扰点* */
        for (let i = 0; i < options.width / 4; i++) {
          ctx.fillStyle = randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(
            randomNum(0, options.width),
            randomNum(0, options.height),
            1,
            0,
            2 * Math.PI
          )
          ctx.fill()
        }
      }

      /** 获取验证码* */
      const GetCode = () => {
        return options.code.toLowerCase()
      }
      /** 验证验证码* */
      const validate = (codes: any) => {
        let code = codes.toLowerCase()
        let v_code = options.code.toLowerCase()
        if (code == v_code) {
          return true
        } else {
          return false
        }
      }

      /** 生成一个随机数* */
      let randomNum = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min)
      }
      /** 生成一个随机色* */
      let randomColor = (min: number, max: number) => {
        let r = randomNum(min, max)
        let g = randomNum(min, max)
        let b = randomNum(min, max)
        return "rgb(" + r + "," + g + "," + b + ")"
      }
    }

    const picyzm = ref<HTMLElement | null>(null)
    let verifyCode: any
    onMounted(() => {
      picyzm.value && picyzm.value.focus()
      console.log(picyzm, "内容")
      //初始化验证码
      verifyCode = GVerify({
        type: "blend",
        height: props.height,
        con: picyzm.value,
        canvasId: "",
        width: 0,
        code: "",
        numArr: [],
        letterArr: [],
      })

      //获取验证码内容
      const code = verifyCode.GetCode()
      console.log(code)
      context.emit("update:Code", code)
    })

    //点击图片主动刷新验证码
    const OnRefresh = () => {
      verifyCode.refresh()
      const code = verifyCode.GetCode()
      console.log(code)
      context.emit("update:Code", code)
    }

    return { picyzm, OnRefresh }
  },
})
</script>

<style>
#picyzm {
  width: 100px;
  height: 40px;
  display: inline-block;
  margin: 0 30px;
}
#verifyCodeDemo {
  width: 100%;
  display: flex;
  margin-top: 200px;
  justify-content: center;
}
#btn {
  margin: 30px auto;
  background-color: blue;
  color: #fff;
  border-radius: 5px;
  border: 0;
  width: 100px;
  height: 40px;
}
</style>
