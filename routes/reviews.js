const express = require('express');
const router = express.Router({ mergeParams: true });

/* GET reviews index /reviews */
router.get('/', (req, res, next) => {
  res.send('/posts/:id/reviews');
});

/* POST  reviews create /reviews */
router.post('/', (req, res, next) =>{ 
    res.send('CREATE /reviews');
});

/* GET reviews Edit /posts/reviews/id/edit */
router.get('/:review_id/edit', (req, res, next) =>{
    res.send('EDIT /posts/:id/reviews/:review_id/edit');
});

/* PUT reviews update /posts/reviews/:id */
router.put('/:review_id', (req, res, next)=>{
    res.send('UPDATE /posts/:id/reviews/:review_id');
});

/* Destroy  reviews /posts/reviews/:id*/
router.delete('/:review_id', (req, res, next) =>{
    res.send('DESTROY /posts/:id/reviews/:review_id');
});


module.exports = router;


