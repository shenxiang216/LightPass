/*
 * @Author: Deep Lane
 * @Date: 2022-01-14 16:45:27
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-02-27 17:01:19
 * @Description:
 */
async function request<T>(method: string, url: string, data?: any): Promise<T> {
  let option: RequestInit = {
    method,
  }
  if (data) {
    option.body = data
  }
  let controller = new AbortController()
  let signal = controller.signal
  // 超时函数
  const timeoutAction = (timer: number): Promise<Response> => {
    return new Promise((reslove) => {
      setTimeout(() => {
        // 实例化超时响应json数据
        const response = new Response(JSON.stringify({ stat: "NO" }))
        reslove(response)
        controller.abort() // 发送终止信号
      }, timer * 1000)
    })
  }
  return Promise.race([
    timeoutAction(10),
    fetch(url, {
      ...option,
      signal: signal, //设置信号
    }),
  ]).then(async (res) => {
    let json: T = await res.json()
    return json
  })
}

async function requestFile<T>(method: string, url: string, data?: any) {
  let option: RequestInit = {
    method,
  }
  if (data) {
    option.body = data
  }
  let res = await fetch(url, option)
  let blob: Blob = await res.blob()
  var a = document.createElement("a")
  var url = window.URL.createObjectURL(blob) // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
  var filename = res.headers.get("Content-Disposition") as string
  filename = decodeURIComponent(filename.split(";")[1].split("=")[1])
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}
export function getFile<T>(url: string) {
  return requestFile<T>("GET", url)
}

export function post<T>(url: string, data?: any) {
  return request<T>("POST", url, data)
}
