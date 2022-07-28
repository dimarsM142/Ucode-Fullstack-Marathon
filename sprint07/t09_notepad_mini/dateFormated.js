module.exports = class {
    constructor(currTime) {
        this.date = new Date(currTime);
    }
    changeDate(num) {
        if(num >= 10) {}
        else {
            return `0${num}`;
        }
        return num;
    }
    getDate() {
        return `${this.date.getFullYear()}-${this.changeDate(this.date.getMonth() + 1)}-${this.changeDate(this.date.getDate())} ${this.changeDate(this.date.getHours())}:${this.changeDate(this.date.getMinutes())}:${this.changeDate(this.date.getSeconds())}`;
    }
}

