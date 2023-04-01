import * as express from 'express'
import router from './router'
import bodyParser = require('body-parser')

const app = express()
// 前端 JS 文件
app.use('/dist', express.static('dist/public/src'))
// 前端静态资源
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
router(app)
app.listen(3000)
console.log('http://127.0.0.1:3000')
