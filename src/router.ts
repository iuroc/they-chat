import getMsgList from './router/getMsgList'
import login from './router/login'
import { Express } from 'express'

export default (app: Express) => {
    app.use(getMsgList, login)
}