const express = require('express')
const passport = require('passport')
const app = express()
const mongoose = require('mongoose')
const exphbs =  require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const authRoutes = require('./routes/home')
const homeRoutes = require('./routes/home')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/database')

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Routes
app.use('/', require('./routes/home'))

//Load config
dotenv.config({ path: './config/config.env' })

connectDB()

//app.set('view engine', 'ejs') //sets up template engine as ejs
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
)

//Passport middleware
app.use(passport.initialize()) 
app.use(passport.session())

//app.use('/', homeRoutes)
//app.use('/auth', authRoutes)
//app.use('/todos', todoRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})