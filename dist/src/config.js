"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = void 0;
/** 数据库配置信息 */
exports.DB_CONFIG = {
    /** 数据库主机名 */
    host: process.env.MYSQL_HOST || 'localhost',
    /** 数据库端口 */
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    /** 数据库用户名 */
    user: process.env.MYSQL_USER || 'root',
    /** 数据库密码 */
    password: process.env.MYSQL_PASSWORD || '12345678',
    /** 数据库名称 */
    database: process.env.MYSQL_DATABASE || 'ponconsoft',
    /** 数据表 */
    table: {
        /** 用户表 */
        user: 'theychat_user',
        /** 消息列表 */
        msg: 'theychat_msg',
        /** 房间列表，群聊和私聊都属于房间 */
        room: 'theychat_room',
    }
};
