var pg = require('pg');
var pool = new pg.Pool();
var uri = 'postgres://qfevzvzqamispj:NYoqaErLCLr84qEkf1v6MWDVAw@ec2-54-243-207-190.compute-1.amazonaws.com:5432/d16s2mb3c9o60u'
function queryDB(sql, cb){
  pool.connect(uri, function(err, client, done){
    client.query(sql, function(err, result){
      cb(result);
    });
  });
}

module.exports = queryDB;
