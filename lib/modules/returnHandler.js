/**
*
* Handle return requests as a middleware
*
**/

module.exports = function(req, res, next){

  var self = this,
      statusCodes = require('../../config/statusCodes')();
  console.log(statusCodes);
  /**
  *
  * Return the requested content type from the header
  *
  **/
  self.getHeaderFormat = function(){
    return req.headers.accept.split(',')[0];
  }

  /**
  *
  * Renders the return based on the header's content type
  * @param {renderTypes} callback from res.return()
  *
  **/
  var renderContent = function(renderTypes){
    var contentType = getHeaderFormat();

    switch(contentType) {
      case 'text/html'            : return renderTypes.html();
      case 'json'                 :
      case 'application/json'     : return renderTypes.json();
      default                     : return renderTypes.html();
    }
  }

  /**
  *
  * Return obj in HTML or JSON depending on request.
  * @param {data} {}
  * @param {view} String viewname (default = 'data')
  * @param {message} String custom message (default = 'no message')
  *
  **/
  res.return = function(data, view, message){
    renderContent({

      html: function(){
        // TODO: render html
        console.log('HTML is returned');
        res.render(view ? view : 'data', { data: data})
      },

      json: function(){
        // TODO: render JSON
        console.log('JSON is returned');
        res.json({
          message: message ? message : 'no message',
          success: true,
          data: data
        });
      }
    });
  }

  /**
  *
  * Return error in HTML of JSON depending on request.
  * @param {statusCode} HTTP status code resembling error
  * @param {statusText} String custom statusText.
  *
  **/
  res.returnErr = function(statusCode, statusText, err){
    // TODO: get statusText from statusText config
    //var statusCodeObj = statusCodes.getStatusCode(statusCode, statusText);

    renderContent({
      html: function(){

        console.log('HTML err is returned');
        res.render('error', {
          message: err.message,
          statusCode: statusCode,
          error: err
        });
      },

      json: function(){

        // TODO: render JSON
        console.log('JSON err is returned');
        res.status(statusCode).json({
          message: err.message,
          success: false,
          statusCode: statusCode
        })
      }
    })
  }
  console.log(getHeaderFormat());

  next();
}
