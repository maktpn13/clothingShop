const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({'dest': 'uploads/'});
const { ayncErrorHandler} = require('../middleware');
const { 
    postIndex, 
    postNew, 
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDestroy
} = require('../controllers/posts');

/* GET posts index /posts */
router.get('/', ayncErrorHandler(postIndex));

/* GET posts new /posts/new */
router.get('/new', postNew);
  
/* POST  posts create /posts */
router.post('/',upload.array('images', 4), ayncErrorHandler(postCreate));

/* GET  posts show /posts/:id */
router.get('/:id', ayncErrorHandler(postShow));

/* GET posts Edit /posts/id/edit */
router.get('/:id/edit', ayncErrorHandler(postEdit));

/* PUT posts update /posts/:id */
router.put('/:id',upload.array('images', 4), ayncErrorHandler(postUpdate));

/* Destroy  posts /posts/:id*/
router.delete('/:id', ayncErrorHandler(postDestroy) );


module.exports = router;


