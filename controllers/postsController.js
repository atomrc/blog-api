var mongoose = require("mongoose");
var Post = require("../models/Post");

exports.index = function(req, res) {
    var posts = Post.find(function (err, posts) {
        if( err ) throw new Exception(err);
        res.send(posts);
    });
}

exports.show = function(req, res) {
    var post = Post.find({slug: req.params.slug}, function( err, post ) {
        if( err ) throw new Exception(err);
        res.send(post);
    });
}

/*** Authenticated section ***/
exports.create = function(req, res) {
    var post = new Post(req.body);
    post.save(function(){
        res.send(post);
    });
}

exports.update = function(req, res) {
    Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        function( err, post ) {
            if( err ) throw new Exception(err);
            res.send(post);
        }
    );
}

exports.delete = function(req, res) {
    Post.findByIdAndRemove(
        req.params.id,
        function( err, post ) {
            if( err ) throw new Exception(err);
            res.send(post);
        }
    );
}
