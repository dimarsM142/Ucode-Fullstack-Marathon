let characters = document.getElementById("characters").children;
let class_of_atributes;
let value;
for (let i = 0; i < characters.length; i++) {
    class_of_atributes = characters[i].getAttribute("class");
    value = characters[i].getAttribute("data-element");
    characters[i].appendChild(document.createElement("br"));
    if (!value) {
        characters[i].setAttribute("data-element", "none");
    } 
    if (class_of_atributes != "evil"  && class_of_atributes != "good"  || !class_of_atributes) {
        characters[i].className = "unknown";
    }
    if (characters[i].getAttribute("data-element") == "none") {
        let button = document.createElement("span");
        let border = document.createElement("span");

        button.setAttribute("class", "elem " + value);
        characters[i].appendChild(button);
        border.setAttribute("class", "border");
        button.appendChild(border);
    }
    else {
        value = characters[i].getAttribute("data-element").split(' ');
        for (let j = 0; j < value.length; j++) {
            let button = document.createElement("span");
            button.setAttribute("class", `elem ${value[j]}`);
            characters[i].appendChild(button);
        }
    }

}