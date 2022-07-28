let name1 = { name: 'Dima' }
let name2 = { name: 'Sasha' }
let name3 = { name: 'Vlad' }
let name4 = { name: 'Nazar'}
  
let guestList = new Map();
guestList.set(name1, "invited").set(name2, "invited").set(name3, "invited").set(name4, "invited");
console.log(guestList.has(name1));
console.log(guestList.length);
console.log(guestList.delete(name4));
  
let menu = new Set();
let dish1 = {  
    name: "pizza", 
    price: 10 
};
let dish2 = { 
    name: "hot-dog", 
    price: 5 
};
let dish3 = { 
    name: "hamburger", 
    price: 8 
};
  
menu.add(dish1).add(dish2).add(dish3);
  
console.log(menu.size);
menu.forEach((dish) => {
    console.log(dish.name + " - " + dish.price + "$");
});
  
let first_id = { id: 1 };
let second_id = { id: 2 };
let third_id = { id: 3 };
let fourth_id = { id: 4 };
  
let bankVault = new WeakMap([[first_id, { owner: "Dima" }],[second_id, { owner: "Sasha" }],[third_id, { owner: "Vlad" }],[fourth_id, { owner: "Nazar" }]]);
console.log(bankVault.get(first_id));
console.log(bankVault.get(second_id));
console.log(bankVault.get(third_id));
console.log(bankVault.get(fourth_id));
  
let first_curr = { value: "UAH" };
let second_curr = { value: "euro" };
let second_curr = { value: "$" };
  
let coinCollection = new WeakSet();
coinCollection.add(first_curr).add(second_curr).add(second_curr);
console.log(coinCollection);