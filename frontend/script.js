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
            <p>Change: ${stock.change} (${stock.changesPercentage}%)</p>
        `;
    })
    .catch(error => {
        console.error("Error fetching stock data:", error);
    });

// Fetch historical stock data for the trend chart
fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${STOCK_SYMBOL}?apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log("Historical data:", data); // Log the entire historical data object for inspection

        const historicalData = data.historical.slice(0,30).reverse(); // Get the last 30 days for simplicity
        console.log("Last 30 days:", historicalData); // Log the last 30 days of data

        const dates = historicalData.map(entry => entry.date);
        const prices = historicalData.map(entry => entry.close);
        const openPrices = historicalData.map(entry => entry.open);
        const highPrices = historicalData.map(entry => entry.high);
        const lowPrices = historicalData.map(entry => entry.low);

        console.log("Dates:", dates); // Log the dates array
        console.log("Prices:", prices); // Log the prices array

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
                },{
                    label: `${STOCK_SYMBOL} Open Price`,
                    data: openPrices,
                    borderColor: '#28a745',
                    fill: false
                },{
                    label: `${STOCK_SYMBOL} High Price`,
                    data: highPrices,
                    borderColor: '#ffc107',
                    fill: false
                },{
                    label: `${STOCK_SYMBOL} Low Price`,
                    data: lowPrices,
                    borderColor: '#dc3545',
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