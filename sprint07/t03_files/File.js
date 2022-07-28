const fs = require('fs'); // Файлы

class File{
    dirFiles = 'content';
    constructor(filename) {
        if(!filename.includes('.txt')) {
            this.filename = `${filename}.txt`;
        } else {
            this.filename = filename;
        }
        this.filePath = `${this.dirFiles}/${this.filename}`;

        // check for file existence
        try {
            fs.accessSync(this.filePath, fs.constants.R_OK);
        } catch (err) {
            this.create();
        }
    }
    write(text) {
        try {
            fs.openSync(this.filePath, 'a+');
        } catch (err) {
            console.error(err);
        }
        try {
            fs.appendFileSync(this.filePath, text);
        } catch (err) {
            console.error(err);
        }
    }
    create () {
        try {
            fs.accessSync(this.dirFiles, fs.constants.R_OK);
        } catch (err) {
            fs.mkdirSync(this.dirFiles);
        }
        fs.writeFile(this.filePath, '', (err) => {
            if (err){
                console.log(err);
            } 
        })
    }
    read() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            if(data){
                return data;
            }
            else{
                return "File is Empty!";
            }
        } catch (err) {
            console.error(err)
        }
        return "No file information";
    }
    delete() {
        fs.rmSync(this.filePath);
        //console.log(res);
    }
}

module.exports = File;