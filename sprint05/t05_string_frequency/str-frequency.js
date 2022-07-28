module.exports = class StrFrequency {
    constructor(str) {
        this.str = str;
    }

    letterFrequencies() {
        let freq = {};
        let temp = this.str.toUpperCase().split('').filter(c => c.match(/[A-Z]/g));
        temp = temp.join('');
        for (let i = 0; i < temp.length; i++) {
            let symbol = temp.charAt(i);
            if (freq[symbol]) {
               freq[symbol]++;
            } else {
               freq[symbol] = 1;
            }
        }
        if (!this.str) {
            return '';
        }
        return freq;
    }

    wordFrequencies() {
        let result = {};
        if (!this.str) {
            let v = {};
            v[''] = 1;
            return v;
        }
        let word_desc = this.str.toUpperCase().split(/[^A-Z]+/g).filter(f => f !== '');
        word_desc.forEach(function(w) {
            if (!result[w]) {
                result[w] = 0;
            }
            result[w] += 1;
        });

        return result;
    }


    reverseString() {
        if (!this.str) {
            return '';
        }
        return this.str.split('').reverse().join('');
    }
}
