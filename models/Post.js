var mongoose = require('mongoose'),
    utils = require('../libs/utils'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Comment = require('../models/Comment');

var PostSchema = new Schema({
    id: ObjectId,
    title: String,
    slug: String,
    created_at: Date,
    comments: [Comment.schema],
}, { versionKey: "version" });

PostSchema.pre('save', function(next) {
    this.created_at = new Date;
    if( !this.title ) next();
    this.slug = utils.slugify(this.title);
    next();
});


module.exports = mongoose.model('Post', PostSchema);

