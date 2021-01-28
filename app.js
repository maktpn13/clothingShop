require('dotenv').config();
const createError = require('http-errors');
const engine = require('ejs-mate');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


//Require Routes 
const indexRouter = require('./routes/index');
const reviewsRouter = require('./routes/reviews');
const postsRouter = require('./routes/posts');


const app = express();


//connect to the database
mongoose.connect('mongodb+srv://clothingShop12:qazxsw123@clothing-shop.mocr4.mongodb.net/clothing-shop?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true

}).then(() =>{
  console.log('Successfully Connected to the DATABASE!!');
}).catch(err => { 
  console.log('ERROR, Something went wrong!', err.message)
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//setup public  assets directory
app.use(express.static('public'))

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


//Configure Passport  and sessions
app.use(session({
  secret: 'keyboard Kings',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Mount Routes
app.use('/', indexRouter);
app.use('/posts/:id/reviews', reviewsRouter);
app.use('/posts', postsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
