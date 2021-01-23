var express = require("express");
//const translate= require('google-translate-open-api');
var router = express.Router();
async function translator(input_from, input_text, input_to) {
  const translate = require("@vitalets/google-translate-api");
  //console.log("F")
  const re = await translate(input_text, {
    client: "gtx",
    from: input_from,
    to: input_to,
  });

  return re;
}

module.exports = { translator };
