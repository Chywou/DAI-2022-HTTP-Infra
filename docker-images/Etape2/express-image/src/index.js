var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send(generateCats());
});

app.listen(2022, function (){
    console.log('Accepting HTTP requests on port 2022');
});

function generateCats() {
    var nbCats = chance.integer({
        min : 1,
        max : 10
    });
    console.log(nbCats);
    var cats = [];
    for (var i = 0; i < nbCats; i++) {
        var gender = chance.gender();
        var birthYear = chance.year({
            min : 2000,
            max : 2022
        });
        var nbHumanSlave = chance.integer({
            min: 1,
            max: 1000
        });
        var chanceToKillHuman = chance.floating({
            min: 0,
            max: 100
        });
        var famousWords = chance.sentence({
            words: 5
        });
        cats.push({
            prefix: chance.prefix({
                full: true,
                gender: gender
            }),
            firstName: chance.first({
                genrder: gender
            }),
            gender: gender,
            birthday: chance.birthday({
                year: birthYear
            }),
            nbHumanSlave: nbHumanSlave,
            chanceToKillHuman: chanceToKillHuman,
            famousWords: famousWords
        });
    }
    console.log(cats);
    return cats;
}
