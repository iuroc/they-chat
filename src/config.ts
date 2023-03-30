/** 数据库配置信息 */
export const DB_CONFIG = {
    /** 数据库主机名 */
    host: 'localhost',
    /** 数据库用户名 */
    user: 'root',
    /** 数据库密码 */
    password: '12345678',
    /** 数据库名称 */
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