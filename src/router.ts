import { Express } from 'express'
import getMsgList from './router/getMsgList'
import login, { logout, postLogin } from './router/login'
import register from './router/register'

export default (app: Express) => {
    app.use(getMsgList, login, postLogin, logout, register)
}