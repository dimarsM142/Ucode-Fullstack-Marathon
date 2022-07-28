let count = localStorage.length;
let history = document.getElementsByClassName("history")[0];

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function AddToStorage() {
    let input = document.getElementById("input").value;
    input = document.getElementById("input").value;
    if (!input) {
        alert("It`s empty. Please try to input something in 'text input'");
    } 
    else {
        let name = "history_" + count;
        localStorage.setItem(name, input );
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