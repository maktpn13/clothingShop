const express = require('express');
const router = express.Router();
const { ayncErrorHandler} = require('../middleware');
const { 
    postIndex, 
    postNew, 
    postCreate,
    postShow,
    postEdit,
    postUpdate
} = require('../controllers/posts');

/* GET posts index /posts */
router.get('/', ayncErrorHandler(postIndex));

/* GET posts new /posts/new */
router.get('/new', postNew);
  
/* POST  posts create /posts */
router.post('/', ayncErrorHandler(postCreate));

/* GET  posts show /posts/:id */
router.get('/:id', ayncErrorHandler(postShow));

/* GET posts Edit /posts/id/edit */
router.get('/:id/edit', ayncErrorHandler(postEdit));

/* PUT posts update /posts/:id */
router.put('/:id', ayncErrorHandler(postUpdate));

/* Destroy  posts /posts/:id*/
router.delete('/:id', (req, res, next) =>{
    res.send('DESTROY /posts/:id');
});


module.exports = router;


