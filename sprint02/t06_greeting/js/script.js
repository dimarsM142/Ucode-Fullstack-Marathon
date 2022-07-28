let first_name = prompt('Please, input your first name');
let last_name = prompt ('Please, input your last name');

if (first_name.match(/^[A-Za-z]+$/) && last_name.match(/^[A-Za-z]+$/)) {
    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase();
    last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase();
    console.log('Hey ' + first_name + " " + last_name);
    alert ('Hey ' + first_name + " " + last_name);
}
else {
    console.log('Wrong input!');
    alert ('Wrong input!');
}