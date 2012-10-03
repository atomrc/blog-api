var mongoose = require('mongoose'),
    utils = require('../libs/utils'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
    id: ObjectId,
    title: {type: String},
    slug: {type: String},
}, { versionKey: "version" });

PostSchema.pre('save', function(next) {
    if( !this.title ) next();
    this.slug = utils.slugify(this.title);
    next();
});


module.exports = mongoose.model('Post', PostSchema);

