
module.exports = function(newsql, config){
  console.log("WE KOMEN IN DE DATABASE");
  console.log(typeof dbConfig);
  var self = this;

  // Repository paths. Name used as key to reference the repository.
  var repositoryPaths = [
    { name: "user", path: "../lib/repositories/userRepository" },
    { name: "community", path: "../lib/repositories/communityRepository"}
  ]

  self.initRepositories = function(){
    if(!self.repositories){
      self.repositories = {};
    }
    for(var i = 0; i < repositoryPaths.length; i++){
      var Repo = require(repositoryPaths[i].path);
      self.repositories[repositoryPaths[i].name] = new Repo(newsql);
    }
  }

  // Init all the repositories
  self.initRepositories();

  // Init NewSQL
  newsql.config(config.databaseTijn); // comment for local-dev
  // new.config(config.database);   // uncomment for local-dev
}
