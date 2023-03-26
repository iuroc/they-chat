import { Router } from 'express'

/** 获取消息列表 */
export default Router().get('/getMsgList', (req, res) => {
    res.json({
        code: 200,
        msg: '获取成功',
        data: []
    })
})