const express = require('express');
const router = express.Router();

/* GET Home page */
router.get('/', (req, res, next) => {
  res.send('/posts');
});

/* GET /register */
router.get('/register', (req, res, next) => {
    res.send('GET /register');
  });

/* POST /register */
router.post('/register', (req, res, next) => {
  res.send('GET /register');
});


/* GET /login */
router.get('/login', (req, res, next) => {
  res.send('GET /login');
});

/* POST /login */
router.post('/login', (req, res, next) => {
  res.send('GET /login');
});

/* GET /Profile */
router.get('/profile', (req, res, next) => {
  res.send('GET /profile');
});

/* Put /profile/:user_id */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('GET /profile/:user_id');
});

/* GET /forgot-pw */
router.get('/forgot', (req, res, next) => {
  res.send('GET /forgot-pw');
});

/* PUT /forgot-pw */
router.put('/forgot', (req, res, next) => {
  res.send('PUT /forgot-pw');
});


/* GET /reset-pw/:token */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset-pw/:token');
});

/* PUT /reset-pw/:token */
router.put('/reset/:token', (req, res, next) => {
  res.send('PUT /reset-pw/:token');
});




module.exports = router;


