import { Response, Request } from 'express'
import { Pool } from 'mysql2'

/** 执行响应 */
function printOut(res: ApiResponse, data: any, message: string, code: number) {
    if (res.hasSent) return
    const jsonData: ApiResponseBody = {
        code: code,
        msg: message,
        data: data
    }
    res.json(jsonData)
}

/** 执行成功响应 */
export function printSuc(res: Response, data: any, message: string) {
    printOut(res, data, message, 200)
}

/** 执行错误响应 */
export function printErr(res: Response, message: string) {
    printOut(res, null, message, 400)
}

/** API 请求 */
export interface ApiRequest extends Request {
    /** 数据库连接 */
    conn?: Pool
}

/** API 响应 */
export interface ApiResponse extends Response {
    /** 响应是否已经发送，若是则不允许继续发送 */
    hasSent?: boolean
}

/** API 响应数据体 */
type ApiResponseBody = {
    code: number,
    msg: string,
    data: any
}