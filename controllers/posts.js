const Post = require('../models/post');
const cloudinary = require('cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocondingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
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
        let response =  await geocondingClient
        .forwardGeocode({
          query: req.body.post.location,
          limit: 1,
      
        })
        .send();
        req.body.post.coordinates = response.body.features[0].geometry.coordinates;
        let post = await Post.create(req.body.post);
        console.log(post);
        console.log(req.body.post.coordinates);
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
    async postUpdate(req, res, next) {
       
    // - find the post by id
    let post = await Post.findById(req.params.id);
    // - check if there's any images for deletion
    if(req.body.deleteImages && req.body.deleteImages){
    
        // assign deleteImages for req.body to its own variable
        let deleteImages = req.body.deleteImages;
        //     - loop over deleteImages    
        for(const public_id of deleteImages){
        //         -delete images from cloudinary
        await cloudinary.v2.uploader.destroy(public_id);
        //         -delete image from post.images
        for(const image of post.images){
            if(image.public_id === public_id){
                let index = post.images.indexOf(image);
                post.images.splice(index,1);
            }
        }   
        }
    }
   
   
        //- Check if there are post.images array
        if(req.files){
            // -upload images
            for(const file of req.files){
                let image =  await cloudinary.v2.uploader.upload(file.path);
                // -add images to post.images array
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }

        }
            // check if location was updated
       
        if(req.body.post.location !== post.location){
        let response =  await geocondingClient
            .forwardGeocode({
              query: req.body.post.location,
             limit: 1,
      
        })
        .send();
            post.coordinates = response.body.features[0].geometry.coordinates;
            post.location = req.body.post.location;
        }
       


        // -update the post with new any new properties
        post.title = req.body.post.title;
        post.price = req.body.post.price;
        post.qty = req.body.post.qty;
        post.description = req.body.post.description;
        
    //     -save the updated post into the database
        post.save();
    //     -redirect the show page

        res.redirect(`/posts/${post.id}`);   
     },

     //Posts Destroy
     async postDestroy(req, res, next){

         let post = await Post.findById(req.params.id);
         for ( const image of post.images){
            await cloudinary.v2.uploader.destroy(image.public_id);

         } 
         await post.remove();
         res.redirect('/posts');

     }
}

