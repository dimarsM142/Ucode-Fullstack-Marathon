class AvengerQuote {
    id;
    author;
    quote;
    photo = [];
    publishDate;
    comments;
    constructor(info) {
        for (let key in info) {
            this[key] = info[key];
        }
    }
}

module.exports.AvengerQuote = AvengerQuote;