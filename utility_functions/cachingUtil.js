const { translator } = require("../utility_functions/translatorUtil");
const {db_user,db_host,db_password,db_database} = require("../config/DB")
var mysql = require("mysql");
var con = mysql.createConnection({
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_database,
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
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

async function smart_precaching(input_from, input_text){
  var langs = {
    'ar': 'Arabic',
    'bn': 'Bengali',
    'en': 'English',
    'fr': 'French',
    'de': 'German',
    'gu': 'Gujarati',
    'hi': 'Hindi',
    'it': 'Italian',
    'ja': 'Japanese',
    'kn': 'Kannada',
    'mr': 'Marathi',
    'ta': 'Tamil',
    'te': 'Telugu',
    'ur': 'Urdu',
    
};
for (let [key, value] of Object.entries(langs)) {
  encache(
    input_from,
    input_text,
    key,
    (await translator(input_from,input_text,key)).text
  );
  console.log(value);
}
  
}
module.exports = { check_in_cache, encache, smart_precaching };
