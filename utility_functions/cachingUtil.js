var mysql = require("mysql");
var con = mysql.createConnection({
  host: "db4free.net",
  user: "codeyoung",
  password: "codeyoung",
  database: "codeyoung",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Result: " + result);
  // });
});

function encache(input_from, input_text, input_to, output_text) {
  var sql =
    'INSERT INTO `cache` (input_text, input_lang,output_text,output_lang) VALUES ("' +
    input_text +
    '", "' +
    input_from +
    '", "' +
    output_text +
    '", "' +
    input_to +
    '")';
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}
function check_in_cache(input_from, input_text, input_to, callback) {
  con.query(
    'SELECT * FROM `cache` WHERE `input_text` = + "' +
      input_text +
      '" AND `input_lang` = "' +
      input_from +
      '" AND `output_lang` = "' +
      input_to +
      '"',
    function (err, rows) {
      if (err) console.log(err);
      //console.log(rows)
      if (rows && rows.length && rows.length > 0) {
        //console.log('inside'+rows[0].output_text)
        callback(rows[0].output_text);
      } else {
        callback(false);
      }
    }
  );
}

module.exports = { check_in_cache, encache };
