const searchInput = document.getElementById("search-input");
const currencySelect = document.getElementById("currency-select");
const statusText = document.getElementById("status-text");
const coinsBody = document.getElementById("coins-body");

let allCoins = [];

async function loadCoins() {
  statusText.textContent = "Loading coins...";

  try {
    const currency = currencySelect.value;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1`
    );
    if (!response.ok) throw new Error("Failed to load coin data");

    allCoins = await response.json();
    statusText.textContent = "";
    renderCoins();
  } catch (err) {
    statusText.textContent = "Error loading coins. Please try again later.";
  }
}

function renderCoins() {
  const query = searchInput.value.toLowerCase();
  const filtered = allCoins.filter((coin) => coin.name.toLowerCase().includes(query));

  coinsBody.innerHTML = "";

  filtered.forEach((coin) => {
    const change = coin.price_change_percentage_24h ?? 0;
    const changeClass = change >= 0 ? "positive" : "negative";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${coin.name} (${coin.symbol.toUpperCase()})</td>
      <td>${coin.current_price}</td>
      <td class="${changeClass}">${change.toFixed(2)}%</td>
    `;
    coinsBody.appendChild(row);
  });
}

searchInput.addEventListener("input", renderCoins);
currencySelect.addEventListener("change", loadCoins);

loadCoins();
