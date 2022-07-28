const fs = require('fs'); // Файлы

class FileList {
    dirFiles = 'content';
    list = [];
    constructor() {
        this.getAllList();
    }
   
   
    getHTMLList() {
        let render = '<ul>';
        this.list.map((item) => {
            render = render + '<li data-file="' + item + '" class="btn-file">' + item + '</li>';
        });
        render = render + '</ul>';
        return render;
    }
    hasFiles() {
        if(this.list){
            return true;
        }
        else {
            return false;
        }
    }
    getAllList() {
        this.list = [];
        try {
            fs.accessSync(this.dirFiles, fs.constants.R_OK);
            let data = fs.readdirSync(this.dirFiles, {encoding: "utf-8", withFileTypes: true});
            if(data) {
                data.forEach((file) => {
                    this.list.push(file.name);
                });
            }

        } catch (err) {
            fs.mkdirSync(this.dirFiles);
        }
        return this.list;

    }
}

module.exports = FileList;