const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//bring routes
const routeBlog = require('./routes/blog')
const routeSignup = require('./routes/auth')

//app
const app = express()
dotenv.config()

//middelwares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//routes middelwares
app.use(process.env.API, routeBlog)
app.use(process.env.API, routeSignup)

//cors 
if (process.env.NODE_ENV == 'dev') {
    app.use(cors({origin : `${process.env.CLIENT_URL}`}))
}

mongoose.connect(process.env.DADATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() =>{
    console.log('Database connected')
}).catch(err => console.log(err))


let port = process.env.PORT || 8081

app.listen(port, () => console.log(`server is run ${port}`))