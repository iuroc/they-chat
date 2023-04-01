import { Router } from 'express'
import { ApiRequest, ApiResponse, printErr, printSuc } from '../util'
import { initDatabase } from '../db'
import cookieParser = require('cookie-parser')
import { cookie } from 'express-validator'
import { DB_CONFIG } from '../config'

/** 用户注册 */
export default Router().get('/register',
    cookieParser(),
    cookie('userName').custom((input) => input.match(/^\w{4,20}$/)).withMessage('用户名长度为4-20个字符'),
    cookie('email').isEmail().withMessage('邮箱格式错误'),
    cookie('password').custom((input) => input.match(/^\w{32}$/)).withMessage('密码格式错误'),
    cookie('nickName').notEmpty().withMessage('昵称不能为空'),
    initDatabase, async (req: ApiRequest, res) => {
        let userName = req.cookies.userName
        let email = req.cookies.email
        let passwordMd5 = req.cookies.password
        let nickName = req.cookies.nickName
        await isExists(res, req)
        req.conn?.query(`INSERT INTO \`${DB_CONFIG.table.user}\`
        (\`user_name\`, \`email\`, \`password_md5\`, \`nick_name\`)
        VALUES ('${userName}', '${email}', '${passwordMd5}', '${nickName}')`, (err) => {
            if (err) return printErr(res, '注册失败')
            printSuc(res, null, '注册成功')
        })
    })

/** 判断命名是否已经存在 */
async function isExists(res: ApiResponse, req: ApiRequest) {
    let sql = `SELECT COUNT(*) FROM \`${DB_CONFIG.table.user}\`
    WHERE 'user_name' = '${req.cookies.userName}' OR 'email' = '${req.cookies.email}'`
    return new Promise(resolve => {
        req.conn?.query(sql, (err, result: any) => {
            if (err) return printErr(res, err.message)
            if (result[0]['COUNT(*)'] == 0) return printErr(res, '用户名或邮箱已存在')
            resolve(null)
        })
    })
}