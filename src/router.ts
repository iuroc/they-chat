import getMsgList from './router/getMsgList'
import { Express } from 'express'

export default (app: Express) => {
    app.use(getMsgList)
}