const fs = require('fs'); 
const fd = require('./dateFormated');

module.exports = class {
    list = [];

    constructor() {
        if(!fs.existsSync(__dirname + "/note.txt")){
            fs.writeFileSync("note.txt", "");
        }
        const data = fs.readFileSync('note.txt', 'utf-8');
        this.note = JSON.parse(data ? data : '{}');
        for(let arg in this.note) {
            this.list.push([arg, this.note[arg]]);
        }
    }
    getList() {
        return this.list;
    }
    get(arg) {
        return (new Map(this.list)).get(arg);
    }
    add(note) {
        try {
            this.note[Date.now()] = {"date": (new fd(Date.now())).getDate(), "name": note.filename, "importance": note.importance, "text": note.content};
            fs.writeFile('note.txt', JSON.stringify(this.note), function() {})
        } catch (err) {
            console.error(err)
        }
    }
    getDetail(arg) {
        let item = this.get(arg);
        let result = `<h2>Detail of "${item.name}"</h2>`;
        result = result + `<ul><li>date: <b>${(new fd(item.date)).getDate()}</b></li>`;
        result = result + `<li>name: <b>${item.name}</b></li>`;
        result = result + `<li>importance: <b>${item.importance}</b></li>`;
        result = result + `<li>text: <b>${item.text}</b></li></ul>`;
        return result;
    }
    delete(arg) {
        delete this.note[arg];
        try {
            fs.writeFile('note.txt', JSON.stringify(this.note), function(err) {})
        } catch (err) {
            console.error(err)
        }
    }
}