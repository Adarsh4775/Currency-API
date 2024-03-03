let originalData = [];

function fetchDataUsingThen() {
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
    .then(response => response.json())
    .then(data => {
      originalData = data;
      renderTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function fetchDataUsingAsyncAwait() {
  async function fetchDataAsync() {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
      const data = await response.json();
      originalData = data;
      renderTable(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchDataAsync();
}

function renderTable(data) {
  const tableBody = document.querySelector('#cryptoTable tbody');
  tableBody.innerHTML = "";

  data.forEach(item => {
    const row = tableBody.insertRow();
    row.innerHTML = `<td>${item.name}</td>
                     <td>${item.id}</td>
                     <td><img src="${item.image}" alt="${item.name}" width="30"></td>
                     <td>${item.symbol}</td>
                     <td>${item.current_price}</td>
                     <td>${item.total_volume}</td>`;
  });
}

function search() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const filteredData = originalData.filter(item => item.name.toLowerCase().includes(input) || item.symbol.toLowerCase().includes(input));
  renderTable(filteredData);
}

function sortByMarketCap() {
  const sortedData = originalData.slice().sort((a, b) => a.market_cap - b.market_cap);
  renderTable(sortedData);
}

function sortByPercentageChange() {
  const sortedData = originalData.slice().sort((a, b) => a.percentage_change - b.percentage_change);
  renderTable(sortedData);
}

// Choose either method to fetch data
// fetchDataUsingThen();
fetchDataUsingAsyncAwait();
