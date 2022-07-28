
window.onload = function() {
    fetch('/PagetoXml')
        .then(response => response.json())
        .then((data) => {
            document.querySelector('#to').innerText = data.to;
            document.querySelector('#from').innerText = data.from;
        });
};