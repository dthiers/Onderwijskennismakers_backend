
/**
*
* id
* Type
* name
* content
* link
* createdAt
* lastUpdate
* User_id
* Community_id
* shortDescription
* isFrozen
*
**/



// TODO: database meegeven
module.exports = function(pool){

  var baseRepo = require('./baseRepository')(pool, "content");

  return {
    baseRepo,
    
    getTags: function(req, res, next) {
        console.log(req.params.id);
        var sql =   'SELECT tag.id, tag.name ' +
                    'FROM tag ' +
                    'LEFT JOIN content_has_tag ON tag.id = content_has_tag.Tag_id ' +
                    'WHERE content_has_tag.Content_id = ?';
        
        pool.query(sql, [req.params.id], function(err, result, fields) {
            if (err) { console.log(err); return next(err); }
            else {
                res.return(result);
            }
        })
    }
  }

}
