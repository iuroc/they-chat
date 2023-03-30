import * as cookieParser from 'cookie-parser'
import { Router, RequestHandler, Request, Response } from 'express'
import { validationResult, cookie } from 'express-validator'
import { DB_CONFIG } from '../config'
import { initDatabase } from '../db'
import { ApiRequest, printErr } from '../util'

/** 登录校验 */
export const verLogin: RequestHandler = async (req: ApiRequest, res, next) => {
    await initDatabase(req, res, () => null)
    await verCookie(req, res)
    // 校验 Cookie 格式
    const errors = validationResult(req)
    if (!errors.isEmpty()) return printErr(res, errors.array()[0].msg)
    // 获取 Cookie 字段值
    let loginName = req.cookies.loginName
    let password = req.cookies.password
    // 查询语句
    let sql = `SELECT COUNT(*) FROM \`${DB_CONFIG.table.user}\` WHERE
    (\`user_name\` = '${loginName}' OR \`email\` = '${loginName}') AND \`password_md5\` = '${password}'`
    // 执行查询
    req.conn?.query(sql, (err, result: any) => {
        if (err) return printErr(res, err.message)
        if (result[0]['COUNT(*)'] == 0) return printErr(res, '登录失败')
        next()
    })
}

/** 登录校验 */
export default Router().get('/login', verLogin, (req: ApiRequest, res) => {

})

/** 校验 Cookie */
async function verCookie(req: Request, res: Response) {
    cookieParser()(req, res, () => null)
    await new Promise(resolve => {
        cookie('loginName')
            .custom((input: string) => input.match(/^\w{4,20}$/))
            .withMessage('用户名长度为4-20个字符')(req, res, () => resolve(null))
    })
    await new Promise(resolve => {
        cookie('password')
            .custom((input: string) => input.match(/^\w{4,20}$/))
            .withMessage('密码长度为4-20个字符')(req, res, () => resolve(null))
    })
}