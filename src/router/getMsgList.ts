import { Router } from 'express'
import { printSuc } from '../util'
import { verLogin } from './login'

/** 获取消息列表 */
export default Router().get('/getMsgList', verLogin, (req, res) => {
    printSuc(res, null, '成功')
    printSuc(res, null, '成功')
    printSuc(res, null, '成功')
    printSuc(res, null, '成功')
})