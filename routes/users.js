"use strict";
//const translate= require('google-translate-open-api');
var express = require("express");
var router = express.Router();
const { translator } = require("../utility_functions/translatorUtil");
const { encache, check_in_cache, smart_precaching } = require("../utility_functions/cachingUtil");

router.get("/", function (req, res) {
  //check if in cache
  check_in_cache(
    req.body.from,
    req.body.text,
    req.body.to,
    async function (result) {
      if (result == false) {
        encache(
          req.body.from,
          req.body.text,
          req.body.to,
          (await translator(req.body.from, req.body.text, req.body.to)).text
        );
        res.json({
          text: (await translator(req.body.from, req.body.text, req.body.to))
            .text,
        });
        smart_precaching(req.body.from,req.body.text)

      } else {
        res.json({ text: result });
      }
    }
  );
});

module.exports = router;
