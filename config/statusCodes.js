/**
*
* Status codes with matching messages. If a custom message is included this will
* be returned with getStatusCode
*
**/

module.exports = function(){

  var statusCodes = {
    200: { statusText: "OK" },
    201: { statusText: "Created." },
    204: { statusText: "No content." },
    304: { statusText: "Not modified." },
    400: { statusText: "Bad request." },
    401: { statusText: "Unauthorized. Authentication failed or is not provided." },
    403: { statusText: "Unauthorized. Extra permission required." },
    404: { statusText: "Not found." },
    500: { statusText: "Internal server error." },
    501: { statusText: "Not implemented." },
  }

  return {
    getStatusCode: function(statusCode, statusText){
      // TODO: return statusCodes[statusCode], if statusText is set, override statustext
      if(statusText){
        return {statusText: {statusText: statusText }};
      } else {
        return statusCodes[statusCode];
      }
    }
  }
}
