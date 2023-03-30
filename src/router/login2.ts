
import { Router } from 'express'
import * as cookieParser from 'cookie-parser'
import { cookie, validationResult } from 'express-validator'
import { CustomRequest, getConn, login } from '../db'
import { printErr } from '../util'
export default Router().get('/login',
    cookieParser(),
    cookie('loginName').custom((input: string) => input.match(/^\w{4,20}$/)).withMessage('用户名长度为4-20个字符'),
    cookie('password').custom((input: string) => input.match(/^\w{4,20}$/)).withMessage('密码长度为4-20个字符'),
    async (req: CustomRequest, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return printErr(res, errors.array()[0].msg)
        const conn = await getConn()
        login(req, res, conn)
    })