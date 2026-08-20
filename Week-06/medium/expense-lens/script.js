const state = {
  transactions: [],
};

const balanceText = document.getElementById("balance-text");
const addForm = document.getElementById("add-form");
const descriptionInput = document.getElementById("description-input");
const amountInput = document.getElementById("amount-input");
const categoryInput = document.getElementById("category-input");
const filterSelect = document.getElementById("filter-select");
const transactionsBody = document.getElementById("transactions-body");

function calculateBalance() {
  return state.transactions.reduce((sum, t) => sum + t.amount, 0);
}

function render() {
  const filter = filterSelect.value;
  const visible =
    filter === "All"
      ? state.transactions
      : state.transactions.filter((t) => t.category === filter);

  transactionsBody.innerHTML = "";
  visible.forEach((t) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.description}</td>
      <td>${t.category}</td>
      <td>$${t.amount.toFixed(2)}</td>
      <td><button data-id="${t.id}" class="delete-btn">Delete</button></td>
    `;
    transactionsBody.appendChild(row);
  });

  balanceText.textContent = `Balance: $${calculateBalance().toFixed(2)}`;
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  state.transactions.push({
    id: Date.now(),
    description: descriptionInput.value,
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
  });

  addForm.reset();
  render();
});

transactionsBody.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const id = Number(e.target.dataset.id);
  state.transactions = state.transactions.filter((t) => t.id !== id);
  render();
});

filterSelect.addEventListener("change", render);

render();
