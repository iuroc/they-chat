import { Router } from 'express'
import { verLogin } from './login'

/** 获取消息列表 */
export default Router().get('/getMsgList', verLogin, (req, res) => {
    res.json({
        code: 200,
        msg: '获取成功',
        data: []
    })
})