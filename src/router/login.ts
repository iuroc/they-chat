import { Router } from 'express'
import * as cookieParser from 'cookie-parser'
import { cookie, validationResult } from 'express-validator'
export default Router().get('/login',
    cookieParser(),
    cookie('username').notEmpty().withMessage('用户名不能为空'),
    cookie('username').isLength({ min: 4, max: 20 }).withMessage('用户名长度为4-20个字符'),
    (req, res) => {
        const errors = validationResult(req)
        console.log(req.cookies)
        if (!errors.isEmpty()) return res.json({ errors: errors.array() })
        res.json({
            code: 200,
            msg: '登录成功',
            data: null
        })
    })