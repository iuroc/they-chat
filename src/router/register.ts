import { Router } from 'express'
import { ApiRequest, ApiResponse, printErr, printSuc } from '../util'
import { initDatabase } from '../db'
import { body, validationResult } from 'express-validator'
import { DB_CONFIG } from '../config'

/** 用户注册 */
export default Router().post('/register',
    body('userName').custom((input) => input.match(/^\w{4,20}$/)).withMessage('用户名长度为4-20个字符'),
    body('email').isEmail().withMessage('邮箱格式错误'),
    body('password').custom((input) => input.match(/^\w{32}$/)).withMessage('密码格式错误'),
    body('nickName').notEmpty().withMessage('昵称不能为空'),
    initDatabase, async (req: ApiRequest, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return printErr(res, errors.array()[0].msg)
        let userName = req.body.userName
        let email = req.body.email
        let passwordMd5 = req.body.password
        let nickName = req.body.nickName
        await isExists(res, req)
        req.conn?.query(`INSERT INTO \`${DB_CONFIG.table.user}\`
        (\`user_name\`, \`email\`, \`password_md5\`, \`nick_name\`)
        VALUES ('${userName}', '${email}', '${passwordMd5}', '${nickName}')`, (err) => {
            if (err) return printErr(res, `注册失败：${err.message}`)
            const sixMonthsInMs = 1000 * 60 * 60 * 24 * 30 * 6
            const options = {
                maxAge: sixMonthsInMs,
                httpOnly: true,
            }
            res.cookie('loginName', userName, options)
            res.cookie('password', passwordMd5, options)
            printSuc(res, null, '注册成功')
        })
    })

/** 判断命名是否已经存在 */
async function isExists(res: ApiResponse, req: ApiRequest) {
    let sql = `SELECT COUNT(*) FROM \`${DB_CONFIG.table.user}\`
    WHERE \`user_name\` = '${req.body.userName}' OR \`email\` = '${req.body.email}'`
    return new Promise(resolve => {
        req.conn?.query(sql, (err, result: any) => {
            if (err) return printErr(res, err.message)
            if (result[0]['COUNT(*)'] > 0) return printErr(res, '用户名或邮箱已存在')
            resolve(null)
        })
    })
}