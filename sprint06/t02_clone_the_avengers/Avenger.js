module.exports = {
    Avenger: class Avenger {
        constructor(name, alias, gender, age, powers, hp) {
            this.name = name;
            this.alias = alias;
            this.powers = powers;
            this.gender = gender;
            this.age = age;
            this.hp = hp;
        }
        damage(damage) {
            this.hp -= damage;
        }
    }
}