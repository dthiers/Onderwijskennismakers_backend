module.exports = function(){

  var config = {};

  // Database config
  config.database = {
    dbConfig: {
        "host"     : "127.0.0.1",
        "database" : "API_Test",
        "user"     : "root",
        "password" : "root",
        "port"     : 8889,
        "supportBigNumbers" : true,
        "connectionLimit"   : 32
    },
    "autoConvert": true
  }

  //Database config to connect to database hosted on aii.avans.nl
  config.databaseTijn = {
    dbConfig: {
      "host"      : "databases.aii.avans.nl",
      "database"  : "trkanter_db2",
      "user"      : "trkanter",
      "password"  : "Ab12345",
      "post"      : 3306,
      "supportBigNumbers" : true,
      "connectionLimit"   : 32
    },
    "autoConvert" : true
  }

  config.databaseMySQL = {
    dbConfig: {
      "connectionLimit" : "100",
      "host"      : "databases.aii.avans.nl",
      "user"      : "trkanter",
      "password"  : "Ab12345",
      "database"  : "trkanter_db2",
      "debug"     : false
    },
    "autoConvert" : true
  }

  config.secret = {
    jwt: "secretitytityity"
  }

  return config;
}
