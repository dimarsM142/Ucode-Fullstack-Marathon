let nick_animal;
let gender;
//let age;
let last_check;
let nick_test = /^[a-zA-Z]+$/;
nick_animal = prompt('What animal is the superhero most similar to?', '');
while((!nick_test.test(nick_animal) || nick_animal.length > 20)){
    alert("ERROR! Wrong input");
    nick_animal = prompt('What animal is the superhero most similar to?', '');
}
let gender_test = /^male$|^female$|^$/;
gender = prompt('Is the superhero male or female? Leave blank if unknown or other', '');
while(!gender_test.test(gender)){
    alert("ERROR! Wrong input");
    gender = prompt('Is the superhero male or female? Leave blank if unknown or other', '');
}
age = prompt('How old is the superhero?', '');
let age_test1 = /^[0-9]{0,5}$/;
let age_test2 = /^[1-9]/;
while(!age_test1.test(age) || !age_test2.test(age)){
    alert("ERROR! Wrong input");
    age = prompt('How old is the superhero?', '');
}
if (gender == "male" && age < 18) {
    last_check = "boy";
}
if (gender == "male" && age >= 18) {
    last_check = "man";
}
if (gender == "female" && age < 18) {
    last_check = "girl";
}
if (gender == "female" && age >= 18) {
    last_check = "woman";
}
if (gender == "" && age < 18) {
    last_check = "kid";
}
if (gender == "" && age >= 18) {
    last_check = "hero";
}
alert(nick_animal + "-" + last_check);