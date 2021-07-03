const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
//const authRoutes = require('./routes/home)
const homeRoutes = require('./routes/home')

//Load config
require('dotenv').config({ path: './config/config.env' })

connectDB()

app.set('view engine', 'ejs') //sets up template engine as ejs
app.use(expreess.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running')
})