
module.exports = function(mysql, config) {
    var self = this;

    var repoDir = "../lib/repositories/";

    // Create the pool to make connections in the repo's
    var pool = mysql.createPool(config.databaseMySQL.dbConfig);

    // Repository paths. Name used as key to reference the repository.
    var repositoryPaths = [
        { name: "user",           path: repoDir + "userRepository" },
        { name: "community",      path: repoDir + "communityRepository" },
        { name: "school",         path: repoDir + "schoolRepository"},
        { name: "keyword",        path: repoDir + "keywordRepository" },
        { name: "content",        path: repoDir + "contentRepository"},
        { name: "register",       path: repoDir + "registrationRepository"},
        { name: "search",         path: repoDir + "searchRepository"},
        { name: "tag",            path: repoDir + "tagRepository"}
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
