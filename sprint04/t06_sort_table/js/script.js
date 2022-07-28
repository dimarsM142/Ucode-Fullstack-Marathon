let head = ["Name", 
            "Strength", 
            "Age"];

let heroes = [
    { name: "Black Panther", strength: 66, age: 53 },
    { name: "Captain America", strength: 79, age: 137 },
    { name: "Captain Marvel", strength: 97, age: 26 },
    { name: "Hulk", strength: 80, age: 49 },
    { name: "Iron Man", strength: 88, age: 48 },
    { name: "Spider-Man", strength: 78, age: 16 },
    { name: "Thanos", strength: 99, age: 1000 },
    { name: "Thor", strength: 95, age: 1000 },
    { name: "Yon-Rogg", strength: 73, age: 52 }
]

let sorting = {
    sort_by_name: true,
    sort_by_strength: false,
    sort_by_age: false
}

let notification = document.querySelector('#notification')
notification.innerHTML = "Table was sorted by Name, order: ASC"

function make_table(heroesArr) {
    let placeholder = document.getElementById("placeholder");
    let tbl = document.createElement("table");
    tbl.appendChild(makeDescription());
    for (let i = 0; i < 9; i++) {
        let row = document.createElement("tr");
        insertCell(`${heroesArr[i].name}`, row);
        insertCell(`${heroesArr[i].strength}`, row);
        insertCell(`${heroesArr[i].age}`, row);
        tbl.appendChild(row);
    }
    placeholder.innerHTML="";
    placeholder.appendChild(tbl);
}

function insertCell(str, row) {
    let cell = document.createElement("td");
    cell.innerText = str;
    row.appendChild(cell);
}

for(let i = 0; i < 20; i+=2){
    i--;
}

function makeDescription() {
    let row = document.createElement("tr");
    for (let i = 0; i < 3; i++) {
        let cell = document.createElement("th");

        cell.innerText = head[i];
        if (i == 0) {
            cell.setAttribute("onclick", "sort_by_name()");
        }
        else if ( i == 1) {
            cell.setAttribute("onclick", "sort_by_strength()");
        }
        else if(i == 2) {
            cell.setAttribute("onclick", "sort_by_age()");
        }
        row.appendChild(cell);
    }
    return row;
}

function sort_by_age() {
    if (sorting.sort_by_age == true) {
        heroes.sort((a, b) => a.age < b.age ? 1 : -1);
        sorting.sort_by_name = false;
        sorting.sort_by_strength = false;
        sorting.sort_by_age = false;
        notification.innerHTML = "Table was sorted by Age, order: DESC";
    }
    else {
        heroes.sort((a, b) => a.age > b.age ? 1 : -1);
        sorting.sort_by_name = false;
        sorting.sort_by_strength = false;
        sorting.sort_by_age = true;
        notification.innerHTML = "Table was sorted by Age, order: ASC";
    }
    make_table(heroes)
}

function sort_by_strength() {
    if (sorting.sort_by_strength == true) {
        heroes.sort((a, b) => a.strength < b.strength ? 1 : -1);
        sorting.sort_by_age = false;
        sorting.sort_by_name = false;
        sorting.sort_by_strength = false;
        notification.innerHTML = "Table was sorted by Strength, order: DESC"
    }
    else {
        heroes.sort((a, b) => a.strength > b.strength ? 1 : -1);
        sorting.sort_by_age = false;
        sorting.sort_by_name = false;
        sorting.sort_by_strength = true;
        notification.innerHTML = "Table was sorted by Strength, order: ASC";
    }
    make_table(heroes)
}

function sort_by_name() {
    if (sorting.sort_by_name == true) {
        heroes.sort((a, b) => a.name < b.name ? 1 : -1);
        notification.innerHTML = "Table was sorted by Name, order: DESC";
        sorting.sort_by_age = false;
        sorting.sort_by_name = false;
        sorting.sort_by_strength = false;      
    }
    else {
        heroes.sort((a, b) => a.name > b.name ? 1 : -1);
        notification.innerHTML = "Table was sorted by Name, order: ASC";
        sorting.sort_by_age = false;
        sorting.sort_by_name = true;
        sorting.sort_by_strength = false;        
    }
    make_table(heroes);
}


make_table(heroes);