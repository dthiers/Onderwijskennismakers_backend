
/**
*
* id
* firstName
* lastName
* email
* password
* functionDescription
* profileImage
* createdAt
* lastUpdate
* isAdmin
* isFrozen
*
**/

// TODO: database meegeven
module.exports = function(pool) {

    var baseRepo = require('./baseRepository')(pool, 'User');

    return {
        pool,
        baseRepo,
        //Hier komen nog extra routes die buiten de baseroute vallen
        // get user by username'

        // get web data by user id
        getWeb: function(req, res, next) {
            console.log(req.params.id);
            var sql = 'SELECT keyword.id as keywordId, keyword.keyword, user.id as userId, user.firstname ' +
                'FROM user ' +
                'LEFT JOIN user_has_keyword ON user.id = user_has_keyword.User_id ' +
                'LEFT JOIN keyword ON user_has_keyword.Keyword_id = keyword.id ' +
                'WHERE keyword.id IN (SELECT Keyword_id FROM user_has_keyword WHERE User_id = ' + req.params.id + ')';

            pool.query(sql, function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    var prettyJSON = [];
                    var hashMap = {};
                    var oldDataArray = result;
                    var arrayCounter = 0;

                    for (var i = 0; i < oldDataArray.length; i++) {
                        oldData = oldDataArray[i];
                        keyId = oldData.keywordId;
                        if (keyId in hashMap) {
                            prettyJSON[hashMap[keyId]].users.push(
                                {
                                    "userId": oldData.userId,
                                    "firstname": oldData.firstname
                                }
                            )
                        }
                        else {
                            prettyJSON.push(
                                {
                                    "keywordId": oldData.keywordId,
                                    "keyword": oldData.keyword,
                                    "users": [
                                        {
                                            "userId": oldData.userId,
                                            "firstname": oldData.firstname
                                        }
                                    ]

                                }
                            )
                            hashMap[keyId] = arrayCounter;
                            arrayCounter++;
                        }
                    }

                    res.return(prettyJSON);
                }
            })
        }

    }

}
