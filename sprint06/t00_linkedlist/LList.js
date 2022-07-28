'use strict'

const { LLData } = require("./LLData");

class LList {
    start = null;
    finish = null;
    counter = 0;

    getFinish() {
        return this.finish;
    }
    getStart() {
        return this.start;
    }
    add(value_of_curr) {
        const nextElem = new LLData(value_of_curr);
        if(!this.start) {
            this.start = nextElem;
        }
        if(this.finish) {
            this.finish.next = nextElem;
            this.finish = nextElem;
            return;
        }
        this.finish = nextElem;
    }

    addFromArray(arrayOfData) {
        arrayOfData.map(item => this.add(item));
    }

    remove(value_of_curr) {
        if(this.start.data == value_of_curr) {
            this.start = this.start.next;
            return true;
        }
        if(this.start == this.finish || !this.start) {
            return false;
        }
        let current = this.start;
        for(; current.next;){
            if(value_of_curr == current.next.data) {
                if(current.next == this.finish ) {
                    this.finish = current;
                }
                current.next = current.next.next;

                return true;
            } else {
                current = current.next;
            }
        }
        return false;
    }

    clear() {
        this.start = null;
        this.finish = null;
    }
    
    contains(value_of_curr) {
        if(!this.start) {
            return false;
        }
        let current = this.start;
        for(; current;) {
            if(current.data === value_of_curr) {
                return true;
            }
            current = current.next;
        }
        return false;
    }


    count() {
        this.counter = 0;
        let current = this.start;
        if(!this.start) {
            return 0;
        }
        while(current) {
            this.counter++;
            current = current.next;
        }
        return this.counter;
    }

    nextElem = this[Symbol.iterator]();
    next() {
        return this.nextElem.next();
    }
    getIterator() {
        return this[Symbol.iterator]();
    }

    toString() {
        let result = [];
        if(!this.start) {
            return '';
        }
        let current = this.start;
        for(; current; ) {
            result.push(current.data);
            current = current.next;
        }
        return result.join(', ');
    }

    filter(filter_foo) {
        if(!this.start) {
            return null;
        }
        let newList = Object.assign(Object.create(this), JSON.parse(JSON.stringify(this)));
        let current = newList.start;
        for(; current; ) {
            if(!filter_foo(current.data)) {
                newList.remove(current.data);
            }
            current = current.next;
        }
        return newList;
    }

    *[Symbol.iterator]() {
        if(!this.start) {
            return;
        }
        let current = this.start;
        for(; current; ) {
            yield current.data;
            current = current.next;
        }
    }
   
}

module.exports.LList = LList;