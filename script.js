const form = document.getElementById("shopping-form");
const itemInput = document.getElementById("item");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const listContainer = document.getElementById("List-container");
const markPurchasedBtn = document.getElementById("mark-purchased-btn");
const clearListBtn = document.getElementById("clear-list-btn");
const totalSelectedEl = document.getElementById("total-selected");
const totalPurchasedEl = document.getElementById("total-purchased");
const totalWholeEl = document.getElementById("total-whole");

let shoppingList = [];

//saves items to the browser

const savedText =localStorage.getItem("myShoppingList");
if(savedText !== null){
    shoppingList =JSON.parse(savedText);
}   


//saves list so that it can be stored
function saveList(){
    localStorage.setItem('myShoppingList', JSON.stringify(shoppingList));
}

//to show the list to the page
 function  showList(){
   listContainer.innerHTML = ''  //prevents items from double counting

   let selectedTotal = 0;
   let purchasedTotal = 0;
   let wholeTotal = 0;

   for(let i = 0; i < shoppingList.length; i++){
    const item = shoppingList[i]    

//calculate cost:
const cost = item.price * item.quantity;

//wholecost:
wholeTotal = wholeTotal + cost;
 if (item.purchased === true) {
            purchasedTotal = purchasedTotal + cost;
        }
        if (item.selected === true) {
            selectedTotal = selectedTotal + cost;
   }
}

 }