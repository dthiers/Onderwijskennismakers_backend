/**
*
* All routes are defined in this module
*
* TODO: all middleware should be required here.
*
**/

module.exports = function(app, db, passport){

    var routeDir        = "../../routes/",
        moment          = require('moment'),
        jwt             = require('jwt-simple'),
        passportModule  = require('./passport/passportModule')(passport, db.repositories.user, app),
        self            = this;

    // Routes
    var     routes = require(routeDir + 'index'),
            user = require(routeDir + 'user')(db.repositories.user),
            school = require(routeDir + 'school')(db.repositories.school),
            content = require(routeDir + 'content')(db.repositories.content),
            community = require(routeDir + 'community')(db.repositories.community),
            keyword = require(routeDir + 'keyword')(db.repositories.keyword),
            login = require(routeDir + 'login')(passport),
            register = require(routeDir + 'register')(db.repositories.register),
            tag = require(routeDir + 'tag')(db.repositories.tag),
            search = require(routeDir + 'search')(db.repositories.search);

    // Uses
    app .use('/', routes)
        .use('/register', register)
        .use('/login', passport.authenticate('local'), passportModule.jwt.generateJwt, login) // TODO: middleware login --> JWT
        .use('/test', function(req, res, next) {
            res.render('test', { message: "Testey test" })
        });

    // Sets authJwt as middleware on all following uses.
    app.use(passportModule.jwt.authJwt);
    app. use('/user', user)
        .use('/school', school)
        .use('/content', content)
        .use('/community', community)
        .use('/keyword', keyword)
        .use('/search', search)
        .use('/tag', tag)
        .use('/test2',function(req, res, next) {
          res.json('YOUVE MADE IT!');
        })
}
