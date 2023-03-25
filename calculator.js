const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const crypto = document.querySelector('#crypto').value;
  const amount = document.querySelector('#amount').value;
  const amountUsd = document.querySelector('#amount-usd').value;
  const sold = document.querySelector('#sold').value;
  const soldUsd = document.querySelector('#sold-usd').value;
  const date = document.querySelector('#date').value;
  
  // Get the price of the crypto on the purchase date
  const query = `
    {
      ${crypto}(date: {eq: "${date}"}) {
        price
      }
    }
  `;

  const url = `https://graphql.bitquery.io/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'YOUR_API_KEY' // Replace with your actual API key
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();

  const price = data.data[crypto][0].price;

  // Calculate the tax
  const purchaseValue = amountUsd;
  const soldValue = soldUsd;
  const capitalGain = soldValue - purchaseValue;
  const taxRate = 0.15; // Replace with your actual tax rate
  const taxOwed = capitalGain * taxRate;

  // Display the result
  resultDiv.textContent = `You owe $${taxOwed.toFixed(2)} in taxes on your ${crypto} purchase.`;
});

// Retrieve the user's language preference and user agent string
const language = navigator.language;
const userAgent = navigator.userAgent;
console.log(`User language: ${language}`);
console.log(`User agent string: ${userAgent}`);