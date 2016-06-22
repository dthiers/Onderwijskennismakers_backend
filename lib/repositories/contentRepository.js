
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

        getKeywords: function(req, res, next) {
            console.log(req.params.id);
            if (req.query.linked == "false") {
                var sql =   'SELECT keyword.id, keyword.keyword ' +
                            'FROM keyword ' +
                            'WHERE keyword.id NOT IN    (SELECT keyword.id ' +
                                                    'FROM keyword ' +
                                                    'LEFT JOIN content_has_keyword ON keyword.id = content_has_keyword.Keyword_id ' +
                                                    'WHERE content_has_keyword.Content_id = ?) ' +
                            'ORDER BY keyword.id';
            }
            else { 
                var sql =   'SELECT keyword.id, keyword.keyword ' +
                            'FROM keyword ' +
                            'LEFT JOIN content_has_keyword ON keyword.id = content_has_keyword.Keyword_id ' +
                            'WHERE content_has_keyword.Content_id = ? ' +
                            'ORDER BY keyword.id';
            }

            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.return(result);
                }
            })
        },
        
        addKeyword: function(req, res, next) {
            console.log(req.params.id);
            var sql = 'INSERT INTO content_has_keyword SET Content_id = ?, ?';

            pool.query(sql, [req.params.id, req.body], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.json("Succesfully created an entity in the content_has_keyword table.");
                }
            })
        },

        deleteKeywordById: function(req, res, next) {
            var sql = 'DELETE FROM content_has_keyword WHERE Content_id = ? AND Keyword_id = ?';

            pool.query(sql, [req.params.id, req.params.keyword_id], function(err, result, fields) {
                console.log(sql);
                if (err) { console.log(err); return next(err); }
                else {
                    res.json("Successfully deleted an entity in the content_has_keyword table")
                }
            })
        }
    }

}
