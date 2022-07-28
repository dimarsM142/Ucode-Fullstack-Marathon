function* generator() {
    this.num = 1;
    while(true) {
        let input = prompt(`Previous result: ${this.num}. Enter a new number:`);
        if (input == null || isNaN(input)) {
            yield error = 'Invalid number!';
        } 
        if (Number(input) >= 10000) {
            this.num = 1;
        } 
        this.num += Number(input);
    }
}
