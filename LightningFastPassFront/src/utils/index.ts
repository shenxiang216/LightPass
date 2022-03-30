/*
 * @Author: Deep Lane
 * @Date: 2022-02-24 10:31:19
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-02-24 11:10:03
 * @Description:
 */

// 存储上传和下载次数
export function CountStorage(date: Date) {
  // 存储
  if (localStorage.getItem("count") == null) {
    localStorage.setItem("count", `${date},1`)
    return true
  } else {
    let countstr: string = localStorage.getItem("count") as string
    let dateLast: Date = new Date(countstr.split(",")[0])
    let date3 = date.getTime() - dateLast.getTime() //时间差秒
    //计算出相差天数
    // let days = Math.floor(date3 / (24 * 3600 * 1000))
    //计算出小时数
    let leave = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    let hours = Math.floor(leave / (3600 * 1000))

    let count: number = Number(countstr.split(",")[1])
    if (hours <= 24 && count > 10) {
      return false
    }
    if (count > 10) count = 0
    localStorage.setItem("count", `${date},${++count}`)
    return true
  }
}
