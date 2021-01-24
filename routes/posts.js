const express = require('express');
const router = express.Router();
const { errorHandler} = require('../middleware');
const { 
    postGet, 
    postNew, 
    postCreate,
    postShow
} = require('../controllers/posts');

/* GET posts index /posts */
router.get('/', errorHandler(postGet));

/* GET posts new /posts/new */
router.get('/new', postNew);
  
/* POST  posts create /posts */
router.post('/', errorHandler(postCreate));

/* GET  posts show /posts/:id */
router.get('/:id', errorHandler(postShow));

/* GET posts Edit /posts/id/edit */
router.get('/:id/edit', (req, res, next) =>{
    res.send('EDIT /posts/:id/edit');
});

/* PUT posts update /posts/:id */
router.put('/:id', (req, res, next)=>{
    res.send('UPDATE /posts/:id');
});

/* Destroy  posts /posts/:id*/
router.delete('/:id', (req, res, next) =>{
    res.send('DESTROY /posts/:id');
});


module.exports = router;


