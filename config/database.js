
module.exports = function(mysql, config) {
    var self = this;

    // Create the pool to make connections in the repo's
    var pool = mysql.createPool(config.databaseMySQL.dbConfig);
    
    // Repository paths. Name used as key to reference the repository.
    var repositoryPaths = [
        { name: "user", path: "../lib/repositories/userRepository" },
        { name: "community", path: "../lib/repositories/communityRepository" },
        { name: "keyword", path: "../lib/repositories/keywordRepository" },
    ]

    self.initRepositories = function() {
        if (!self.repositories) {
            self.repositories = {};
        }
        for (var i = 0; i < repositoryPaths.length; i++) {
            var Repo = require(repositoryPaths[i].path);
            self.repositories[repositoryPaths[i].name] = new Repo(pool);
        }
    }

    // Init all the repositories
    self.initRepositories();

}
