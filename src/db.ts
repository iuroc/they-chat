import { NextFunction, Response } from 'express'
import { createPool, Pool } from 'mysql2'
import { DB_CONFIG } from './config'
import { ApiRequest, ApiResponse, printErr } from './util'

/**
 * 中间件，初始化数据库
 * @param req 请求对象
 * @param res 响应对象
 * @param next 下一个函数
 */
export const initDatabase = async (req: ApiRequest, res: Response, next: NextFunction) => {
    const conn = createPool({
        host: DB_CONFIG.host,
        port: DB_CONFIG.port,
        user: DB_CONFIG.user,
        password: DB_CONFIG.password
    })
    req.conn = conn
    await new Promise(resolve => {
        conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\``, (err, result) => {
            conn.query(`USE \`${DB_CONFIG.database}\``, (err) => {
                if (err) printErr(res, err.message)
                resolve(err)
            })
        })
    })
    await initTables(res, conn)
    next()
}

/**
 * 初始化数据表
 * @param res 响应对象
 * @param conn 数据库连接
 */
async function initTables(res: ApiResponse, conn: Pool) {
    await new Promise(resolve => {
        conn.query(`CREATE TABLE IF NOT EXISTS \`${DB_CONFIG.table.user}\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID，只用于索引',
            \`nick_name\` VARCHAR(255) UNIQUE COMMENT '用户昵称',
            \`user_name\` VARCHAR(255) UNIQUE COMMENT '用户名，可用于登录',
            \`email\` VARCHAR(255) UNIQUE COMMENT '邮箱，可用于登录',
            \`password_md5\` VARCHAR(255) COMMENT '密码的md5密文',
            \`create_time\` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间'
        )`, (err) => {
            if (err) printErr(res, err.message)
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
            if (err) printErr(res, err.message)
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
            if (err) printErr(res, err.message)
            resolve(err)
        })
    })
}