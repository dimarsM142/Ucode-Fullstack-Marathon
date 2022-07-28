class Human {
    constructor(firstName, lastName, gender, age, calories){
        this.age = age;
        document.getElementById("age").innerHTML = age;
        this.lastName = lastName;
        document.getElementById("lastName").innerHTML = lastName;
        this.calories = calories;
        document.getElementById("calories").innerHTML = calories;
        this.firstName = firstName;
        document.getElementById("firstName").innerHTML = firstName;
        this.gender = gender;
        document.getElementById("gender").innerHTML = gender;
        this.sleepTime = false;
        this.feedTime = false;
        setInterval(() => this.hungry(), 60000);
    }
    
    feed() {
        if(!this.sleepTime && !this.feedTime){
            this.feedTime = true;
            this.calories = +this.calories + 200;
            document.getElementById("calories").innerHTML = this.calories;
            document.querySelector(".container .info").innerHTML = "Nom nom nom";
            setTimeout(() => {
                document.querySelector(".container .info").innerHTML = "";
                if(this.calories > 0 && this.calories < 500) {
                    document.querySelector(".container .info").innerHTML = "I'm still hungry";
                    this.feedTime = false;
                } 
                else {
                    document.querySelector(".container .info").innerHTML = "I'm not hungry";
                    setTimeout(() => {
                        document.querySelector(".container .info").innerHTML = "";
                        this.feedTime = false;
                    }, 2000)
                }
            }, 10000);
        }
    }
    sleepFor(sleep_seconds) {
        if(!this.feedTime && !this.sleepTime){
            document.querySelector(".container .info").innerHTML = "I'm sleeping";
            this.sleepTime = true;
            setTimeout(() => {
                document.querySelector(".container .info").innerHTML = "I'm awake now";
                this.sleepTime = false;
                setTimeout(() => {
                    document.querySelector(".container .info").innerHTML = "";
                }, 2000)
            }, sleep_seconds * 1000);
        }
    }
    hungry() {
        if(this.calories > 200) {
            this.calories = +this.calories - 200;
        }
        document.getElementById("calories").innerHTML = this.calories;
    }
}

class Superhero extends Human {
        constructor(firstName, lastName, gender, age, calories) {
        super(firstName, lastName, gender, age, calories);
        this.flyTime = false;
        this.fightTime = false;
        document.querySelector(".container .hiden_img").classList.replace("hiden_img", "image");
        document.querySelector(".container .image").classList.replace("image", "hiden_img");
        document.querySelector(".container .buttons .hiden_btn").classList.replace("hiden_btn", "new_btn");
        document.querySelector(".container .buttons .hiden_btn").classList.replace("hiden_btn", "new_btn");
    }
    fightWithEvil() {
        if(!this.fightTime && !this.flyTime ){
            this.fightTime = true;
            document.querySelector(".container .info").innerHTML = "Khhhh-chh... Bang-g-g-g... Evil is defeated!";
            setTimeout(() => {
                document.querySelector(".container .info").innerHTML = "";
                this.fightTime = false;
            }, 3000)
        }
    }
    fly() {
        if(!this.flyTime && !this.fightTime){
            this.flyTime = true;
            document.querySelector(".container .info").innerHTML = "I'm flying!";
            setTimeout(() => {
                document.querySelector(".container .info").innerHTML = "";
                this.flyTime = false;
            }, 10000)
        }
    }
}

const human = new Human("Joeseph", "Gomez", "male", 25, 0);
let superhero;
document.querySelector(".container .buttons .sleep").addEventListener("click", event => {
    human.sleepFor(prompt("Enter number of seconds to sleep"));
})
document.querySelector(".container .buttons .feed").addEventListener("click", event => {
    human.feed();
})
document.querySelector(".container .turn").addEventListener("click", event => {
    if(human.calories >= 500) {
        superhero = new Superhero("Mohammed", "Salah", "King", 30, human.calories);
    } else {
        document.querySelector(".container .info").innerHTML = "Not enough calories!";
    }
})
document.querySelector(".container .buttons .fly").addEventListener("click", event => {
    superhero.fly();
})
document.querySelector(".container .buttons .fight").addEventListener("click", event => {
    superhero.fightWithEvil();
})