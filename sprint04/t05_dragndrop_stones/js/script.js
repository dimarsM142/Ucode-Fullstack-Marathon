let button = {
    target: null
}
let area = document.getElementById("area");

area.addEventListener("mouseup", () => {
    event.target.style.cursor = "default";
    button.target = null;
});


area.addEventListener("mousemove", e => {
    if (button.target != null) {
        button.target.style.top = ( - button.offsetY + e.pageY) + "px";
        button.target.style.left = ( - button.offsetX + e.pageX) + "px";
       
    }
});

area.addEventListener("dblclick", event => {
    if (event.target.classList.contains("figure") && event.target != null ) {
        if (event.target.getAttribute("value") !== "on") {
            event.target.setAttribute("value", "on");
        }
        else {
            event.target.setAttribute("value", "off");
        }
    }
});

area.addEventListener("mousedown", event => {
    if (event.target.getAttribute("value") === "on" && event.target != null && event.target.classList.contains("figure")) {
        button.target = event.target;
        button.offsetY = event.offsetY;
        button.offsetX = event.offsetX;
        event.target.style.cursor = "none";

    }
});