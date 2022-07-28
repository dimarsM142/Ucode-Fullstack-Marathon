module.exports.Team = class {
    constructor(id, array) {
        this.id = id;
        this.avengers = array;
    }
    clone() {
        return Object.assign(Object.create(this), JSON.parse(JSON.stringify(this)));
    }
    calculateLosses(teamForCalculate) {
        let counter = teamForCalculate.avengers.length - this.avengers.length ;
        if(counter) {
            console.log("In this battle we lost " + counter + " Avengers");
        } else {
            console.log(`We haven't lost anyone in this battle!`);
            
        }
    }
    battle(damage) {
        this.avengers = this.avengers.filter(item => {
            item.damage(damage.damage);
            if(item.hp > 0) {
                return item;
            }
        });
    }
}