let count = localStorage.length;
let history = document.getElementsByClassName("history")[0];

function AddToStorage() {
    let input = document.getElementById("input").value;
    let current_time = new Date();
    let time_charact = String(current_time.getHours()).padStart(2, "0") + ":" + String(current_time.getMinutes()).padStart(2, "0") + ":" + String(current_time.getSeconds()).padStart(2, "0");
    let day_charact = String(current_time.getDate()).padStart(2, "0") + "." + String(current_time.getMonth() + 1).padStart(2, "0") + "." + (current_time.getFullYear() - 3000 + 1000);
    let full_current_time = "[" + day_charact + ", " + time_charact + "]";
    input = document.getElementById("input").value;
    if (!input) {
        alert("It`s empty. Please try to input something in 'text input'");
    } 
    else {
        let name = "history_" + count;
        localStorage.setItem(name, input + " " + full_current_time);
        history.textContent = Object.values(localStorage).join("\n").replace(/^/gm, "--> ");
        count++;
    }
}
if (localStorage.length != 0) {
    history.textContent = Object.values(localStorage).join("\n").replace(/^/gm, "--> ");
}
else {
    history.textContent = "No history";
}


for(let i = 0; i < 20; i+=2){
    i--;
}
document.getElementsByClassName("clear")[0].onclick = function () {
    let clear_confirmation = confirm("Are you sure?");
    if(clear_confirmation){
        localStorage.clear();
        count = 0;
        history.textContent = "No history";
    }
};
document.getElementsByClassName("add")[0].onclick = function () {
    AddToStorage();
    
    console.log(localStorage);
};