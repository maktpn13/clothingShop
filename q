[1mdiff --git a/app.js b/app.js[m
[1mindex 323aa07..2f91650 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -4,8 +4,10 @@[m [mconst path = require('path');[m
 const cookieParser = require('cookie-parser');[m
 const logger = require('morgan');[m
 const bodyParser = require('body-parser')[m
[32m+[m
 const indexRouter = require('./routes/index');[m
 const usersRouter = require('./routes/users');[m
[32m+[m[32mconst postsRouter = require('./routes/posts');[m
 [m
 const app = express();[m
 [m
[36m@@ -23,6 +25,8 @@[m [mapp.use(express.static(path.join(__dirname, 'public')));[m
 [m
 app.use('/', indexRouter);[m
 app.use('/users', usersRouter);[m
[32m+[m[32mapp.use('/posts', postsRouter);[m
[32m+[m
 [m
 // catch 404 and forward to error handler[m
 app.use(function(req, res, next) {[m
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex a8b950a..ab1c346 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -1248,6 +1248,30 @@[m
         }[m
       }[m
     },[m
[32m+[m[32m    "serve-favicon": {[m
[32m+[m[32m      "version": "2.5.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/serve-favicon/-/serve-favicon-2.5.0.tgz",[m
[32m+[m[32m      "integrity": "sha1-k10kDN/g9YBTB/3+ln2IlCosvPA=",[m
[32m+[m[32m      "requires": {[m
[32m+[m[32m        "etag": "~1.8.1",[m
[32m+[m[32m        "fresh": "0.5.2",[m
[32m+[m[32m        "ms": "2.1.1",[m
[32m+[m[32m        "parseurl": "~1.3.2",[m
[32m+[m[32m        "safe-buffer": "5.1.1"[m
[32m+[m[32m      },[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "ms": {[m
[32m+[m[32m          "version": "2.1.1",[m
[32m+[m[32m          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.1.tgz",[m
[32m+[m[32m          "integrity": "sha512-tgp+dl5cGk28utYktBsrFqA7HKgrhgPsg6Z/EfhWI4gl1Hwq8B/GmY/0oXZ6nF8hDVesS/FpnYaD/kOWhYQvyg=="[m
[32m+[m[32m        },[m
[32m+[m[32m        "safe-buffer": {[m
[32m+[m[32m          "version": "5.1.1",[m
[32m+[m[32m          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.1.1.tgz",[m
[32m+[m[32m          "integrity": "sha512-kKvNJn6Mm93gAczWVJg7wH+wGYWNrDHdWvpUmHyEsgCtIwwo3bqPtV4tR5tuPaUhTOo/kvhVwd8XwwOllGYkbg=="[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "serve-static": {[m
       "version": "1.13.2",[m
       "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.13.2.tgz",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 8751004..b7d0d2f 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -14,7 +14,8 @@[m
     "http-errors": "~1.6.3",[m
     "mongoose": "^5.11.13",[m
     "morgan": "~1.9.1",[m
[31m-    "passport": "^0.4.1"[m
[32m+[m[32m    "passport": "^0.4.1",[m
[32m+[m[32m    "serve-favicon": "^2.5.0"[m
   },[m
   "devDependencies": {[m
     "dotenv": "^8.2.0",[m
[1mdiff --git a/public/stylesheets/style.css b/public/stylesheets/style.css[m
[1mindex 9453385..c622a46 100644[m
[1m--- a/public/stylesheets/style.css[m
[1m+++ b/public/stylesheets/style.css[m
[36m@@ -1,8 +1,8 @@[m
 body {[m
[31m-  padding: 50px;[m
[32m+[m[32m  padding: 10px;[m
   font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;[m
 }[m
 [m
 a {[m
[31m-  color: #00B7FF;[m
[32m+[m[32m  color: #00b7ff;[m
 }[m
[1mdiff --git a/routes/index.js b/routes/index.js[m
[1mindex ecca96a..41410e4 100644[m
[1m--- a/routes/index.js[m
[1m+++ b/routes/index.js[m
[36m@@ -1,9 +1,42 @@[m
[31m-var express = require('express');[m
[31m-var router = express.Router();[m
[32m+[m[32mconst express = require('express');[m
[32m+[m[32mconst router = express.Router();[m
 [m
 /* GET home page. */[m
[31m-router.get('/', function(req, res, next) {[m
[31m-  res.render('index', { title: 'Express' });[m
[32m+[m[32mrouter.get('/', (req, res, next) => {[m
[32m+[m[32m  res.render('index', { title: 'Clothing Shop - Home' });[m
 });[m
 [m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
 module.exports = router;[m
[1mdiff --git a/views/index.ejs b/views/index.ejs[m
[1mindex 7b7a1d6..b1204c8 100644[m
[1m--- a/views/index.ejs[m
[1m+++ b/views/index.ejs[m
[36m@@ -1,11 +1,24 @@[m
[31m-<!DOCTYPE html>[m
[31m-<html>[m
[32m+[m[32m<!doctype html>[m
[32m+[m[32m<html lang="en">[m
   <head>[m
[31m-    <title><%= title %></title>[m
[32m+[m[32m    <!-- Required meta tags -->[m
[32m+[m[32m    <meta charset="utf-8">[m
[32m+[m[32m    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">[m
[32m+[m[32m   <!-- Bootstrap CSS -->[m
[32m+[m[32m   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">[m
     <link rel='stylesheet' href='/stylesheets/style.css' />[m
[32m+[m
[32m+[m[32m    <title><%= title %></title>[m
   </head>[m
   <body>[m
[32m+[m[41m  [m
     <h1><%= title %></h1>[m
     <p>Welcome to <%= title %></p>[m
[32m+[m[41m [m
[32m+[m[32m    <!-- Optional JavaScript -->[m
[32m+[m[32m    <!-- jQuery first, then Popper.js, then Bootstrap JS -->[m
[32m+[m[32m    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>[m
[32m+[m[32m    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>[m
[32m+[m[32m    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>[m
   </body>[m
[31m-</html>[m
[32m+[m[32m</html>[m
\ No newline at end of file[m
