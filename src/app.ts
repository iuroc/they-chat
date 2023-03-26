import * as express from 'express'
import router from './router'

const app = express()
app.use('/dist', express.static('dist/public/src'))
app.use(express.static('public'))
router(app)
app.listen(3000)
console.log('http://127.0.0.1:3000')
