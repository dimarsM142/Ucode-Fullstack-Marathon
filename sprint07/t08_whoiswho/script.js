window.onload = function() {
    document.querySelectorAll('select').forEach(function(item) {
        item.addEventListener('change', function() {
            sendFilter();
        });
    });
};
function sendFilter() {
    document.querySelector('#submit').click();
}