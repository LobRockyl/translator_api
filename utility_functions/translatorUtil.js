var express = require("express");
const tunnel = require('tunnel');
//const translate= require('google-translate-open-api');
var router = express.Router();
async function translator(input_from, input_text, input_to) {
  const translate = require("@vitalets/google-translate-api");
  //console.log("F")
  const re = await translate(input_text, {
    client: "t|gtx",
    from: input_from,
    to: input_to,
  },{
    agent: tunnel.httpsOverHttp({
    proxy: { 
      host: '45.130.229.230',
      port: '443',
      headers: {
        'User-Agent': 'Node'
      }
    }
  })
});

  return re;
}

module.exports = { translator };
