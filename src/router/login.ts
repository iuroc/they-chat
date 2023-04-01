import cookieParser = require('cookie-parser')
import { decode } from 'querystring'
import { Router, RequestHandler, Request, Response } from 'express'
import { validationResult, cookie } from 'express-validator'
import { DB_CONFIG } from '../config'
import { initDatabase } from '../db'
import { ApiRequest, ApiResponse, printErr, printSuc } from '../util'
import { NextFunction } from 'express-serve-static-core'

/** 中间件，登录校验 */
export const verLogin: RequestHandler = async (req: ApiRequest, res, next) => {
    await verCookie(req, res)
    run(req, res, next, req.cookies)
}

const postVerLogin: RequestHandler = async (req: ApiRequest, res, next) => {
    await verBody(req, res)
    run(req, res, next, req.body)
}
const run = async (req: ApiRequest, res: Response, next: NextFunction, paramData: any) => {
    await initDatabase(req, res, () => null)
    // 校验 Cookie 格式
    const errors = validationResult(req)
    if (!errors.isEmpty()) return printErr(res, errors.array()[0].msg)
    // 获取 Cookie 字段值
    let loginName = paramData.loginName
    let password = paramData.password
    // 查询语句
    let sql = `SELECT COUNT(*) FROM \`${DB_CONFIG.table.user}\` WHERE
    (\`user_name\` = '${loginName}' OR \`email\` = '${loginName}') AND \`password_md5\` = '${password}'`
    // 执行查询
    req.conn?.query(sql, (err, result: any) => {
        if (err) return printErr(res, err.message)
        if (result[0]['COUNT(*)'] == 0) return printErr(res, '用户名或密码错误')
        next()
    })
}


/** 登录校验 */
export default Router().get('/login', verLogin, (req: ApiRequest, res) => {
    printSuc(res, null, '成功')
})

/** 退出登录 */
export const logout = Router().get('/logout', (req, res) => {
    res.clearCookie('loginName')
    res.clearCookie('password')
    printSuc(res, null, '退出登录成功')
})

/** POST 方式登录校验 */
export const postLogin = Router().post('/login', postVerLogin, (req: ApiRequest, res) => {
    const sixMonthsInMs = 1000 * 60 * 60 * 24 * 30 * 6
    const options = {
        maxAge: sixMonthsInMs,
        httpOnly: true,
    }
    res.cookie('loginName', req.body.loginName, options)
    res.cookie('password', req.body.password, options)
    printSuc(res, null, '成功')
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
            .custom((input: string) => input.match(/^\w{32}$/))
            .withMessage('密码长度为32个字符')(req, res, () => resolve(null))
    })
}


async function verBody(req: Request, res: Response) {
    // cookieParser()(req, res, () => null)
    // await new Promise(resolve => {
    //     cookie('loginName')
    //         .custom((input: string) => input.match(/^\w{4,20}$/))
    //         .withMessage('用户名长度为4-20个字符')(req, res, () => resolve(null))
    // })
    // await new Promise(resolve => {
    //     cookie('password')
    //         .custom((input: string) => input.match(/^\w{32}$/))
    //         .withMessage('密码长度为32个字符')(req, res, () => resolve(null))
    // })
}