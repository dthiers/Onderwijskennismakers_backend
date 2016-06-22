/**
*
* errorHandler module seperated from app.js
*
**/

module.exports = function(app){

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err);
    res.returnErr(404);
    next(err);
  });


  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      //console.log('JE SUIS EEN FOUTJE');
      console.log(err);
      res.returnErr((err.status || 500), err.message, err);

        // TODO: remove this.
      // res.status(err.status || 500);
      // res.render('error', {
      //   message: err.message,
      //   error: err
      // });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}
