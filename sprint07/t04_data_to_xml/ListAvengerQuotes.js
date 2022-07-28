const fs = require('fs');
const { AvengerQuote } = require('./AvengerQuote');
const xml2js = require('xml2js');

class ListAvengerQuotes {
    textXML = '';
    constructor(data) {
        this.data = this.init(data);
    }
    PagetoXml(file) {
        let builder = new xml2js.Builder();
        this.textXML = builder.buildObject(this.data);

        try {
            fs.writeFile(file, this.textXML, (err) => {
                if (err) console.log(err);
            });
        } catch (err) {
            console.error(err)
        }
    }
    init(data) {

        let arr = [] ;
        this.data = data.map((item, key) => {
            arr.push({comment: new AvengerQuote(item)});
        });
        return arr;
    }
    fromXML(file) {
        return this.textXML;
    }
}

module.exports.ListAvengerQuotes = ListAvengerQuotes;