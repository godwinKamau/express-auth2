const passport = require('passport')
const Message = require('./Message.js')
const User = require('./User.js')

module.exports = function(app,db) {
    app.get('/', async (req,res) => {
        res.sendFile(__dirname + '/public/homepage.html')
    })

    app.get('/getmessages', async (req,res) => {
        let messages = await Message.find()
        res.send(messages)
    })

    app.post('/postmessage', async (req,res) => {  
        console.log(req.body)

        let message = await Message.create({
            message: req.body.message,
            location: {
                lat:req.body.location.lat,
                long:req.body.location.long
            }
        })
        res.json({ redirect: '/profile' });

    })
//=============Login/Logout/Sessions
    app.post('/register', function (req, res) {
      User.register(
          new User({ 
            email: req.body.email, 
            username: req.body.username 
          }), req.body.password, function (err, msg) {
            if (err) {
              res.send(err);
            } else {
              res.redirect('/profile');
            }
          }
        )
      })
    
    app.post('/login', passport.authenticate('local', { 
        failureRedirect: '/login-failure', 
        successRedirect: '/profile'
        }), 
        (err, req, res, next) => {
            if (err) next(err);
        }
    )
    
    app.get('/login-failure', (req, res, next) => {
        console.log(req.session);
        res.sendFile(__dirname + '/public/login.html')
    });
    
    app.get('/login-success', (req, res, next) => {
        console.log(req.session);
        res.send('Login Attempt was successful.');
    });
    
    app.get('/profile', function(req, res) {
        console.log(req.session)
        if (req.isAuthenticated()) {
            let messages = Message.find()
            res.render('index.ejs', { messages : messages })
        } else {
            res.sendFile(__dirname + '/public/login.html')
        }
    })
    
    app.post('/logout', function(req, res, next){
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    })
    
}