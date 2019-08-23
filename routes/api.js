var express = require('express');
var router = express.Router();

const rp = require('request-promise').defaults({ encoding: 'latin1' });
const cheerio = require('cheerio');
const axios = require('axios');


const iddaalobisi = "http://iddaalobisi.com/avrupada-en-cok-oynanan-maclar.html";
const betistutaFutbol = "http://www.betistuta.de/Futbol.aspx";
const orandelliBulten = "http://www.betistuta.de/Iddaa.aspx";

router.get('/iddaalobisi', function (req, res) {

    rp(iddaalobisi).then((html) => {
        var table = cheerio('.sOdList', html).html();
        res.status(200).send(table);
        res.end();

    }).catch((err) => {
        res.status(400).send(err);
        console.log('iddaalobisi hata ----> ' + err);
        res.end();
    })
});

router.get('/betistuta-futbol', function (req, res) {

    axios.get(betistutaFutbol).then((html) => {
        var table = cheerio('#ctl00_MainContentFull_MainContent_MainGrid', html.data).html();
        res.status(200).send(table);

    }).catch((err) => {
        res.status(400).send(err);
        console.log('-------betistuta-futbol hata-------');
        console.log(err.data);

    }).finally(() => {
        res.end();
    });
});

router.get('/orandelli-bulten', function (req, res) {

    axios.get(orandelliBulten).then((html) => {
        var table = cheerio('#ctl00_MainContentFull_MainContent_MainGrid', html.data).html();
        res.status(200).send(table);
    }).catch((err) => {
        res.status(400).send(err);
        console.log('-------orandelli-bulten hata-------');
        console.log(err.data);
    }).finally(() => {
        res.end();
    })
});

module.exports = router;