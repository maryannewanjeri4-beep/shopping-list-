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

const STORAGE_KEY = "myShoppingList";

let shoppingList = loadList();

function loadList() {
  const savedText = localStorage.getItem(STORAGE_KEY);
  if (!savedText) return [];

  try {
    const parsed = JSON.parse(savedText);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not parse saved shopping list:", error);
    return [];
  }
}

function saveList() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingList));
}

function formatCurrency(value) {
  return `KSh ${Number(value).toFixed(2)}`;
}

function updateSummary() {
  let selectedTotal = 0;
  let purchasedTotal = 0;
  let wholeTotal = 0;

  shoppingList.forEach((item) => {
    const cost = Number(item.price) * Number(item.quantity);
    wholeTotal += cost;

    if (item.purchased) {
      purchasedTotal += cost;
    }

    if (item.selected) {
      selectedTotal += cost;
    }
  });

  totalSelectedEl.textContent = formatCurrency(selectedTotal);
  totalPurchasedEl.textContent = formatCurrency(purchasedTotal);
  totalWholeEl.textContent = formatCurrency(wholeTotal);
}

function renderList() {
  listContainer.innerHTML = "";

  if (shoppingList.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Your list is empty.";
    listContainer.appendChild(emptyItem);
    updateSummary();
    return;
  }

  shoppingList.forEach((item, index) => {
    const row = document.createElement("li");
    if (item.purchased) {
      row.classList.add("purchased-item");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(item.selected);

    const text = document.createElement("span");
    text.textContent = `${item.name} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`;
    text.style.flex = "1";
    text.style.cursor = "pointer";

    checkbox.addEventListener("change", () => {
      shoppingList[index].selected = checkbox.checked;
      saveList();
      renderList();
    });

    text.addEventListener("click", () => {
      shoppingList[index].purchased = !shoppingList[index].purchased;
      saveList();
      renderList();
    });

    row.appendChild(checkbox);
    row.appendChild(text);
    listContainer.appendChild(row);
  });

  updateSummary();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = itemInput.value.trim();
  const price = Number.parseFloat(priceInput.value);
  const quantity = Number.parseInt(quantityInput.value, 10);

  if (!name || Number.isNaN(price) || Number.isNaN(quantity) || price <= 0 || quantity <= 0) {
    alert("Please enter a valid item name, price, and quantity.");
    return;
  }

  shoppingList.push({
    name,
    price,
    quantity,
    purchased: false,
    selected: false,
  });

  saveList();
  form.reset();
  itemInput.focus();
  renderList();
});

markPurchasedBtn.addEventListener("click", () => {
  shoppingList = shoppingList.map((item) => {
    if (item.selected) {
      return { ...item, selected: false, purchased: true };
    }
    return item;
  });

  saveList();
  renderList();
});

clearListBtn.addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to delete everything?");
  if (!confirmed) return;

  shoppingList = [];
  saveList();
  renderList();
});

renderList();