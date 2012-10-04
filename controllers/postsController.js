var mongoose = require('mongoose');
var Post = require('../models/Post');
var Comment = require('../models/Comment');
var NotFound = require('../libs/errors').NotFound;

exports.index = function(req, res) {
    var posts = Post.find(function (err, posts) {
        if( err ) throw new NotFound;
        res.send(posts);
    });
}

exports.show = function(req, res, next) {
    res.send(req.post);
}

exports.create = function(req, res) {
    var post = new Post(req.body);
    post.save(function(err, post){
        res.send(post);
    });
}

exports.comment = function(req, res) {
    var post = req.post;
    var comment = new Comment(req.body);
    post.comments.push(comment);
    post.save(function( err, post) {
        if(err) throw new Error(err);
        res.send(post);
    });
}

exports.deleteComment = function(req, res) {
    res.send(req.comment);
}

exports.update = function(req, res) {
    Post.findByIdAndUpdate(
        req.params.post_id,
        req.body,
        function( err, post ) {
            if( err ) return next(new NotFound);
            if( !post ) return next(new NotFound);
            res.send(post);
        }
    );
}

exports.delete = function(req, res) {
    var post = req.post;
    post.remove();
    res.send(post);
}

