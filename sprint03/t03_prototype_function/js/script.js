String.prototype.removeDuplicates = function removeDuplicates() {
    let string = '';
    for(let i = 0; i < this.length; i++) {
        if(!(this[i - 1] == ' ' && this[i] == ' ' )) {
            string = string + this[i];
        }
    }
    string = string.split(' ');
    for(let i = 0; i < string.length; i++) {
        let index = string.indexOf(string[i], i + 1);
        if(index != -1) {
            string.splice(index, 1);
            i--;
        } 
    }
    return string.join(' ');
}
