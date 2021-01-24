const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name:'dli7gfynt',
    api_key: '432183853271129',
    api_secret: process.env.CLOUDINARY_SECRET

});

module.exports = {
    // Post Index
    async postIndex(req, res , next) {
        let posts = await Post.find({});
        res.render('posts/index', {posts});
    },
    // Post New
    postNew(req, res, next) {
        res.render('posts/new');
    },

    // Posts Create
   async postCreate (req, res, next) {
       // user req.body to create a new Post
       req.body.post.images = [];
       for(const file of req.files){
         let image =  await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
       let post = await Post.create(req.body.post);
       res.redirect(`/posts/${post.id}`);  
    },

    // Posts Show 
    async postShow (req, res, next){
      let post = await Post.findById(req.params.id);
        res.render('posts/show', {post});
    },

    //Posts Edit
    async postEdit(req, res, next){
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {post});
    },

    //Post Update
    async postUpdate(req, res, next){
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
        res.redirect(`/posts/${post.id}`);   
     },

     //Posts Destroy
     async postDestroy(req, res, next){
         let post = await Post.findByIdAndRemove(req.params.id);
         res.redirect('/posts');

     }
}