
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
module.exports = function(pool) {

    var baseRepo = require('./baseRepository')(pool, "content");

    return {
        baseRepo,

        getTags: function(req, res, next) {
            console.log(req.params.id);
            if (req.query.linked == "false") {
                var sql =   'SELECT tag.id, tag.name ' +
                            'FROM tag ' +
                            'WHERE tag.id NOT IN    (SELECT tag.id ' +
                                                    'FROM tag ' +
                                                    'LEFT JOIN content_has_tag ON tag.id = content_has_tag.Tag_id ' +
                                                    'WHERE content_has_tag.Content_id = ?) ' +
                            'ORDER BY tag.id';
            }
            else { 
                var sql =   'SELECT tag.id, tag.name ' +
                            'FROM tag ' +
                            'LEFT JOIN content_has_tag ON tag.id = content_has_tag.Tag_id ' +
                            'WHERE content_has_tag.Content_id = ? ' +
                            'ORDER BY tag.id';      
            }

            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.return(result);
                }
            })
        },
        
        addTag: function(req, res, next) {
            console.log(req.params.id);
            var sql = 'INSERT INTO content_has_tag SET Content_id = ?, ?';

            pool.query(sql, [req.params.id, req.body], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.json("Succesfully created an entity in the content_has_tag table.");
                }
            })
        },

        deleteTagById: function(req, res, next) {
            console.log(req.params.id);
            console.log(req.body.Tag_id);
            
            
            var sql = 'DELETE FROM content_has_tag WHERE Content_id = ? AND Tag_id = ?';

            pool.query(sql, [req.params.id, req.body.Tag_id], function(err, result, fields) {
                console.log(sql);
                if (err) { console.log(err); return next(err); }
                else {
                    res.json("Successfully deleted an entity in the content_has_tag table")
                }
            })
        }
    }

}
