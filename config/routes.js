var controllers = require('../controllers');
var passport = require('passport');

var authenticateApp = function(req, res, next) {
    if(!req.query.apiKey) return res.send('Unauthorized', 401);
    //TODO check if apiKey is authorized
    return next();
}

// Routes
module.exports = function(app) {
    var defaultAction = function(req, res) {
        console.log(req.params);
        res.end("ok");
    }
    app.get('/', controllers.homeController.index);

    //POSTS
    app.get('/posts', authenticateApp, controllers.postsController.index);
    app.post('/posts', controllers.postsController.create);
    app.get('/posts/:id', controllers.postsController.show);
    app.delete('/posts/:id', controllers.postsController.delete);
    app.put('/posts/:id', controllers.postsController.update);
}
