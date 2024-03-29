var controllers  = require('../controllers');
var passport     = require('passport');
var Unauthorized = require('../libs/errors').Unauthorized;
var NotFound     = require('../libs/errors').NotFound;
var Post         = require('../models/Post');

var authenticateApp = function(req, res, next) {
    if(!req.query.apiKey) return next(new Unauthorized);
    //TODO check if apiKey is authorized
    return next();
}

var loadPost = function(req, res, next) {
    Post.findOne({slug: req.params.post_slug}, function(err, post) {
        if( err ) return next(new NotFound);
        if( post === null ) return next(new NotFound);
        req.post = post;
        return next();
    });
}

// Routes
module.exports = function(app) {
    var defaultAction = function(req, res) {
        console.log(req.params);
        res.end("ok");
    }
    app.get('/', controllers.homeController.index);

    //POSTS
    app.get('/posts', controllers.postsController.index);
    app.post('/posts', authenticateApp, controllers.postsController.create);
    app.get('/posts/:post_slug', loadPost, controllers.postsController.show);
    app.delete('/posts/:post_slug', authenticateApp, loadPost, controllers.postsController.delete);
    app.put('/posts/:post_slug', authenticateApp, controllers.postsController.update);

    //COMMENTS
    app.post('/posts/:post_slug/comments', loadPost, controllers.postsController.comment);
    app.delete('/posts/:post_slug/comments/:comment_id', authenticateApp, loadPost, controllers.postsController.deleteComment);
}
