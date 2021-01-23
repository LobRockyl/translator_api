var express = require("express");
const tunnel = require('tunnel');
const {proxy_host,proxy_port}=require('../config/proxy')
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
      host: proxy_host,
      port: proxy_port,
      headers: {
        'User-Agent': 'Node'
      }
    }
  })
}).catch(err => {
  console.error(err);
});

  return re;
}

module.exports = { translator };
