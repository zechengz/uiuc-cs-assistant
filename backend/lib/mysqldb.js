const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'csassistant.web.engr.illinois.edu',
  user: 'csassistant_auth',
  password: 'vHwF@qnTonR2',
  database: 'csassistant_auth',
  port: 3306
});

connection.connect(function(error) {
  if (error) {
    throw console.error(error);
  } else {
    console.log('Remote Database Connected');
  }
});

connection.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

module.exports = connection;
