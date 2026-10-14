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

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const updateSummary = () => {
  const selectedTotal = shoppingList
    .filter((item) => item.selected && !item.purchased)
    .reduce((sum, item) => sum + item.quantity * item.price, 0);

  const purchasedTotal = shoppingList
    .filter((item) => item.purchased)
    .reduce((sum, item) => sum + item.quantity * item.price, 0);

  const wholeTotal = shoppingList.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  totalSelectedEl.textContent = formatCurrency(selectedTotal);
  totalPurchasedEl.textContent = formatCurrency(purchasedTotal);
  totalWholeEl.textContent = formatCurrency(wholeTotal);
};

const renderList = () => {
  listContainer.innerHTML = "";

  if (shoppingList.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Your list is empty.";
    listContainer.appendChild(emptyItem);
    updateSummary();
    return;
  }

  shoppingList.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = `shopping-item ${item.purchased ? "purchased" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.selected;
    checkbox.setAttribute("aria-label", `Select ${item.name}`);
    checkbox.addEventListener("change", () => {
      item.selected = checkbox.checked;
      updateSummary();
    });

    const label = document.createElement("label");
    label.textContent = `${item.name} — ${item.quantity} x ${formatCurrency(item.price)} = ${formatCurrency(item.quantity * item.price)}`;
    if (item.purchased) {
      label.style.textDecoration = "line-through";
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listContainer.appendChild(listItem);
  });

  updateSummary();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = itemInput.value.trim();
  const price = Number.parseFloat(priceInput.value);
  const quantity = Number.parseInt(quantityInput.value, 10);

  if (!name || Number.isNaN(price) || Number.isNaN(quantity) || price <= 0 || quantity <= 0) {
    window.alert("Please enter a valid item name, price, and quantity.");
    return;
  }

  shoppingList.push({
    id: Date.now() + Math.random(),
    name,
    price,
    quantity,
    selected: false,
    purchased: false,
  });

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

  renderList();
});

clearListBtn.addEventListener("click", () => {
  shoppingList = [];
  renderList();
});

renderList();
