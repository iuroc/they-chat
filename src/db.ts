import { createPool, Pool } from 'mysql2'
import { NextFunction, Request, Response } from 'express'
/** 数据库配置信息 */
export const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'ponconsoft',
    /** 数据表 */
    table: {
        /** 用户表 */
        user: 'theychat_user',
        /** 消息列表 */
        msg: 'theychat_msg',
        /** 房间列表，群聊和私聊都属于房间 */
        room: 'theychat_room',
    }
}
/** 获取数据库连接并初始化 */
function getConn() {
    const conn = createPool({
        host: DB_CONFIG.host,
        user: DB_CONFIG.user,
        password: DB_CONFIG.password
    })
    return new Promise<Pool>((resolve) => {
        conn.query(`CREATE DATABASE IF NOT EXISTS ${DB_CONFIG.database}`, (err) => {
            conn.query(`USE ${DB_CONFIG.database}`, async (err) => {
                if (err) console.log(err)
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
    conn?: Pool
}

export function initDatabaseAndLogin(req: CustomRequest, res: Response, next: NextFunction) {
    getConn().then(value => {
        req.conn = value
        login(value, req)
        next()
    })
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
 * 
 * @param loginName 
 * @param password 
 */
export function login(conn: Pool, req: CustomRequest) {
    let loginName = req.cookies.loginName
    let password = req.cookies.password
    console.log(`登录名：${loginName}，密码：${password}`)
}