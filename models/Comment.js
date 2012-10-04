var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    id: ObjectId,
    name: String,
    email: String,
    comment: String,
    created_at: Date
});

CommentSchema.pre('save', function(next) {
    this.created_at = new Date;
    next();
});

module.exports = mongoose.model('Comment', CommentSchema);
