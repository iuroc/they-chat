import { Router } from 'express'
import * as cookieParser from 'cookie-parser'
import { cookie, validationResult } from 'express-validator'
import { initDatabaseAndLogin, CustomRequest } from '../db'
export default Router().get('/login',
    cookieParser(),
    cookie('loginName').custom((input: string) => input.match(/\w{4,20}/)).withMessage('用户名长度为4-20个字符'),
    cookie('password').custom((input: string) => input.match(/\w{4,20}/)).withMessage('密码长度为4-20个字符'),
    initDatabaseAndLogin,
    async (req: CustomRequest, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.json({ errors: errors.array() })
        const conn = req.conn
        res.json({
            code: 200,
            msg: '登录成功',
            data: null
        })
    })