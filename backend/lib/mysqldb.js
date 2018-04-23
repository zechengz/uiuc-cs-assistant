const mysql = require('mysql');

// Single MySql Connection
// var connection = mysql.createConnection({
//   host: 'csassistant.web.engr.illinois.edu',
//   user: 'csassistant_auth',
//   password: 'vHwF@qnTonR2',
//   database: 'csassistant_auth',
//   port: 3306
// });
//
// connection.connect(function(error) {
//   if (error) {
//     throw console.error(error);
//   } else {
//     console.log('Remote Database Connected');
//   }
// });
//
// connection.config.queryFormat = function (query, values) {
//   if (!values) return query;
//   return query.replace(/\:(\w+)/g, function (txt, key) {
//     if (values.hasOwnProperty(key)) {
//       return this.escape(values[key]);
//     }
//     console.log('in');
//     console.log(txt);
//     return txt;
//   }.bind(this));
// };
// module.exports = connection;

// Create A MySql Connection Pool
// NOTE: pool.query() =
//        pool.getConnection() + connection.query() + connection.release()
var pool = mysql.createPool ({
  host: 'csassistant.web.engr.illinois.edu',
  user: 'csassistant_auth',
  password: 'vHwF@qnTonR2',
  database: 'csassistant_auth',
  port: 3306
});

pool.getConnection((err, connection) => {
  if (err) {
    throw console.error(err);
  } else {
    console.log('Connected To Remote MySql Database Success!');
  }

  console.log('Releasing current connection...');
  connection.release();
});

pool.on('acquire', function (connection) {
  connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };
});

// pool.on('connection', (connection) => {
//   console.log('Configuring custom query format...');
// });

module.exports = pool;
