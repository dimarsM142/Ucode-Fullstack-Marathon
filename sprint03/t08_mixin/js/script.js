let houseMixin = {
    wordReplace(old_word, new_word) {
        this.description = this.description.replace(old_word, new_word);
    },
    wordDelete(word) {
        this.description = this.description.replace(word, "");
    },
    wordInsertAfter(old_word, new_word) {
        this.description = this.description.replace(old_word, old_word + " " + new_word);
    },
    wordEncrypt() {
        this.description = (this.description + "").replace(/[a-zA-Z]/gi, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < "n" ? 13 : -13));
        });
    },
    wordDecrypt() {
        this.wordEncrypt();
    },
}