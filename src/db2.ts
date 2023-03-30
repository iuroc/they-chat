import { createPool, Pool } from 'mysql2'
import { NextFunction, Request, Response } from 'express'
import { printErr, printSuc } from './util'
import { DB_CONFIG } from './config'

/** 获取数据库连接并初始化 */
export function getConn() {
    const conn = createPool({
        host: DB_CONFIG.host,
        user: DB_CONFIG.user,
        password: DB_CONFIG.password
    })
    return new Promise<Pool>((resolve) => {
        conn.query(`CREATE DATABASE IF NOT EXISTS ${DB_CONFIG.database}`, (err) => {
            conn.query(`USE ${DB_CONFIG.database}`, async (err) => {
                if (err)
                // 初始化数据表
                initTable(conn)
                resolve(conn)
            })
        })
    })
}
/** 中间件，初始化数据库 */
export async function initDatabase(req: CustomRequest, res: Response, next: NextFunction) {
    getConn().then(value => {
        req.conn = value
        next()
    })
}

export interface CustomRequest extends Request {
    /** 数据库连接 */
    conn?: Pool,
    /** 校验登录信息是否成功 */
    hasLogin?: boolean
}
/** 初始化数据表 */
async function initTable(conn: Pool) {
    await new Promise(resolve => {
        conn.query(`CREATE TABLE IF NOT EXISTS \`${DB_CONFIG.table.user}\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID，只用于索引',
            \`nick_name\` VARCHAR(255) UNIQUE COMMENT '用户昵称',
            \`user_name\` VARCHAR(255) UNIQUE COMMENT '用户名，可用于登录',
            \`email\` VARCHAR(255) UNIQUE COMMENT '邮箱，可用于登录',
            \`password_md5\` VARCHAR(255) COMMENT '密码的md5密文',
            \`create_time\` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间'
        )`, (err) => {
            if (err) console.log(err)
            resolve(err)
        })
    })
    await new Promise(resolve => {
        conn.query(`CREATE TABLE IF NOT EXISTS \`${DB_CONFIG.table.msg}\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY COMMENT '消息ID，只用于索引',
            \`from_user\` INT COMMENT '发送人ID',
            \`to_room\` INT COMMENT '目标房间ID',
            \`create_time\` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间'
        )`, (err) => {
            if (err) console.log(err)
            resolve(err)
        })
    })
    await new Promise(resolve => {
        conn.query(`CREATE TABLE IF NOT EXISTS \`${DB_CONFIG.table.room}\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY COMMENT '房间ID，只用于索引',
            \`limit_num\` INT COMMENT '房间限制人数',
            \`has_num\` INT COMMENT '房间已有人数',
            \`create_time\` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '房间创建时间'
        )`, (err) => {
            if (err) console.log(err)
            resolve(err)
        })
    })
}

/**
 * 校验登录
 * @param req 请求对象
 * @param res 相应对象
 * @param conn 数据库连接
 * @returns 
 */
export function login(req: CustomRequest, res: Response, conn: Pool) {
    let loginName: string = req.cookies.loginName
    let password: string = req.cookies.password
    let sql = `SELECT COUNT(*) FROM \`${DB_CONFIG.table.user}\` WHERE
    (\`user_name\` = '${loginName} OR \`email\` = '${loginName}') AND \`password_md5\` = '${password}'`
    conn.query(sql, (err, rows) => {
        if (err) return printErr(res, err.message)
        if (!rows) return printErr(res, '登录失败')
        return printSuc(res, null, '成功')
    })
}