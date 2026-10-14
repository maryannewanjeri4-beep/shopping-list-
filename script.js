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

 const row = document.createElement('li');



 if (item.purchased === true) {
            row.classList.add('purchased-item');
        }
 
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.selected;


        //concantatio
  const text = document.createElement('span');
        text.textContent = item.name + ' (x' + item.quantity + ') - $' + cost.toFixed(2);
        text.style.cursor = 'pointer'; // changes the curso into an arm
        text.style.flex = '1';


         checkbox.addEventListener('change', function () {
            selectItem(i, checkbox.checked);
        });
 
        text.addEventListener('click', function () {
            togglePurchased(i);
        });
 
        editButton.addEventListener('click', function () {
            editItem(i);
        });
 

        row.appendChild(checkbox);  //Attaches the clickable checkbox to the far left of the row.
        row.appendChild(text);//Attaches the clickable checkbox to the far left of the row.
        row.appendChild(editButton);//Attaches the clickable checkbox to the far left of the row.
        listContainer.appendChild(row);//• Takes the fully assembled row package and drops it onto your screen inside your <ul> container so the user can finally see it.

//makes the totals to have 2dp
          totalSelectedSpan.textContent = '$' + selectedTotal.toFixed(2);
    totalPurchasedSpan.textContent = '$' + purchasedTotal.toFixed(2);
    totalWholeSpan.textContent = '$' + wholeTotal.toFixed(2);
    
//functions that change the list
    function selectItem(position, isChecked) {
    shoppingList[position].selected = isChecked;
    saveList();// into permanent memory
    showList();
}


function togglePurchased(position) {
    // "!" flips true to false and false to true
    shoppingList[position].purchased = !shoppingList[position].purchased;
    saveList();
    showList();
}