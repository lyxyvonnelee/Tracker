// Replace with your API key from Financial Modeling Prep
const API_KEY = '3aa346be065555744b52940a3f4b206a';
const STOCK_SYMBOL = 'ONTO'; // Example: Apple Inc.

// Fetch current stock data
fetch(`https://financialmodelingprep.com/api/v3/quote/${STOCK_SYMBOL}?apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const stock = data[0];
        const stockInfoDiv = document.getElementById('stockInfo');
        stockInfoDiv.innerHTML = `
            <h2>${stock.name} (${stock.symbol})</h2>
            <p>Price: $${stock.price}</p>
            <p>Change: ${stock.change} (${stock.changePercent}%)</p>
        `;
    })
    .catch(error => {
        console.error("Error fetching stock data:", error);
    });

// Fetch historical stock data for the trend chart
fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${STOCK_SYMBOL}?apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const historicalData = data.historical.slice(-30); // Get the last 30 days for simplicity
        const dates = historicalData.map(entry => entry.date);
        const prices = historicalData.map(entry => entry.close);

        const ctx = document.getElementById('stockChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `${STOCK_SYMBOL} Stock Price`,
                    data: prices,
                    borderColor: '#007bff',
                    fill: false
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'linear'
                    }]
                }
            }
        });
    })
    .catch(error => {
        console.error("Error fetching historical stock data:", error);
    });