/*
 * @Author: Deep Lane
 * @Date: 2022-02-24 10:31:19
 * @LastEditors: 赵亚鑫Deep Lane
 * @LastEditTime: 2022-04-12 21:13:39
 * @Description:
 */

// 存储上传和下载次数
export function CountStorage(date: Date) {
  // 存储
  if (localStorage.getItem("count") == null) {
    localStorage.setItem("count", `${date},0`)
    return true
  } else {
    let countstr: string = localStorage.getItem("count") as string
    let dateLast: Date = new Date(countstr.split(",")[0])
    let date3 = date.getTime() - dateLast.getTime() //时间差秒
    //计算出相差天数
    let days = Math.floor(date3 / (24 * 3600 * 1000))
    let count: number = Number(countstr.split(",")[1])
    if (days < 1 && count > 10) {
      return false
    }
    if (count > 10) count = 0
    localStorage.setItem("count", `${date},${++count}`)
    return true
  }
}
