const path = require('path')
const env = require('dotenv')
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const connectToMongo = require('./db')
const User = require('./User.js')
const port = 3000

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

connectToMongo()
const mongoose = require('mongoose')

//TODO: could I move this to my db page?
const MongoStore = require('connect-mongo')
const datab = mongoose.connection
app.use(session({
    secret:'justTheBeginning',
    resave:false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: datab.client.s.url})
}))

const strategy = new localStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app)

app.listen(port, () => {
    console.log(`Running on localhost:${port}`)
})