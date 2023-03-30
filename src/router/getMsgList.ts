import { Router } from 'express'
import { printSuc } from '../util'
import { verLogin } from './login'
import { ApiRequest } from '../util'

/** 获取消息列表 */
export default Router().get('/getMsgList', verLogin, (req: ApiRequest, res) => {
    printSuc(res, null, '成功')
    printSuc(res, null, '成功')
    printSuc(res, null, '成功')
    printSuc(res, null, '成功')
})