const express = require('express');
const cors = require('cors');
const mongodb = require('./data/contactsDb');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080;

app
  
  .use(express.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT'], origin: '*' }))
  .use('/', require('./routes'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
  //});
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(`Logged in as ${req.session.user.displayName}`);
  } else{
    res.send('Not Logged In');
  }
});

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),  
  (req, res) => {
    console.log('Callback route hit');
    console.log('Authenticated user:', req.user);
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {
      console.log('Server is listening at port ' + (port));
    });
  }
});

