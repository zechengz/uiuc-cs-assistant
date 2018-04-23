const sqlLoader = require('../lib/sql-loader');
const sql = sqlLoader.loadSqlEquiv('./backend/routes/user');
const Promise = require('bluebird');
let trackInfo = {'Basics':
    ['cs100','cs101','cs105','cs125','cs126','cs173','cs196','cs199','cs210','cs225','cs233','cs241','cs242',
    'cs296','cs357','cs361','cs374'],
    'Software Foundations':
    ['cs422','cs426','cs427','cs428','cs429','cs476','cs477','cs492','cs493','cs494','cs498 Software Testing','cs522','cs524','cs526','cs527','cs528','cs576'],
    'Algorithms and Models of Computation':
    ['cs413','cs473','cs475','cs476','cs477','cs481','cs482','cs571','cs572','cs573','cs574','cs575','cs576','cs579','cs583',
    'cs584'],
    'Intelligence and Big Data':
    ['cs410','cs411','cs412','cs414','cs440','cs443','cs445','cs446','cs447','cs466','cs467','cs510','cs511','cs512','cs543',
    'cs544','cs546','cs548','cs566','cs576','cs598 Mach Lrng for Signal Processng'],
    'Human and Social Impact':
    ['cs416','cs460','cs461','cs463','cs465','cs467','cs468','cs498 Art and Science of Web Prog','cs498RK','cs563','cs565'],
    'Media':
    ['cs414','cs418','cs419','cs445','cs465','cs467','cs498 Virtual Reality','cs519','cs565','cs598 Mach Lrng for Signal Processng'],
    'Scientific, Parallel, and High Performance Computing':
    ['cs419','cs450','cs457','cs466','cs482','cs483','cs484','cs519','cs554','cs555','cs556','cs558'],
    'Distributed Systems, Networking, and Security':
    ['cs423','cs424','cs425','cs431','cs436','cs438','cs439','cs460','cs461','cs463','cs483','cs484','cs523','cs524','cs525',
    'cs538','cs563'],
    'Machines':
    ['cs423','cs424','cs426','cs431','cs433','cs484','cs523','cs526','cs533','cs536','cs541','cs584','cs598 Parallel Programming'],
    'Group Project':
    ['cs427','cs428','cs429','cs445','cs465','cs467','cs493','cs494']};

const mysql = require('mysql');
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

async function name(pool, trackInfo) {
  const keys = Object.keys(trackInfo);
  for (var i = 0; i < keys.length; i++) {
    // console.log('In track');
    let key = keys[i]; // track
    let item = trackInfo[key]; // classes
    for (var j = 0; j < item.length; j++) {
      console.log('in class');
      await new Promise((resolve, reject) => {
        pool.query(sql.insertTrackClass, {
          u_track: key,
          u_class: item[j],
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }).then(() => {
        console.log('Insert Ok!');
      }).catch(err => {
        console.log('wtfffff');
      });
    }
  }
}
name(pool, trackInfo);
