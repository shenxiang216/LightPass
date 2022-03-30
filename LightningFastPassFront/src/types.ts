/*
 * @Author: Deep Lane
 * @Date: 2022-01-14 16:41:47
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-01-29 22:38:08
 * @Description: 
 */
export interface IFile {
  file: FormData
}
export interface IVerify{
  id?: string, // 容器Id
  canvasId: string, // canvas的ID
  width: number, // 默认canvas宽度
  height: number, // 默认canvas高度
  type?: string, // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
  code: string,
  con?: any,
  numArr:string[],
  letterArr:string[]
}
