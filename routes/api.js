var express = require('express');
var router = express.Router();

const rp = require('request-promise').defaults({ encoding: 'latin1' });
const cheerio = require('cheerio');
const axios = require('axios');

const IL_avr_maclar = "http://iddaalobisi.com/avrupada-en-cok-oynanan-maclar.html";
const IL_oraniDusen = "http://iddaalobisi.com/orani-dusen-maclar.html";
const betistutaFutbol = "http://www.betistuta.de/Futbol.aspx";
const orandelliBulten = "http://www.betistuta.de/Iddaa.aspx";

router.get('/iddaalobisi-avr-maclar', function (req, res) {
    iddaalobisi(IL_avr_maclar).then((result) => {
        if (result.error) {
            console.log("Avrupada Oynan Maçlar Çekilemedi...");
            console.log(result);
            res.status(400);
        }
        else {
            res.status(200).send(result);
            console.log(result)
        }
        res.end();
    });
});

router.get('/iddaalobisi-oran-dusen', function (req, res) {
    iddaalobisi(IL_oraniDusen).then((result) => {
        if (result.error) {
            console.log("Oranı Düşen Maçlar Çekilemedi...");
            console.log(result);
            res.status(400);
        }
        else {
            res.status(200).send(result);
            console.log(result)
        }
        res.end();
    });
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


var iddaalobisi = (url) => {
    return rp(url).then((html) => {
        return cheerio('.sOdList', html).html();
    }).catch((err) => {
        return err;
    });
}
module.exports = router;