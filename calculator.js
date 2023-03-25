const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const crypto = document.querySelector('#crypto').value;
  const amount = document.querySelector('#amount').value;
  const amountUsd = document.querySelector('#amount-usd').value;
  const sold = document.querySelector('#sold').value;
  const soldUsd = document.querySelector('#sold-usd').value;
  const purchaseDate = document.querySelector('#purchase-date').value;
  const saleDate = document.querySelector('#sale-date').value;
  
  // Get the price of the crypto on the purchase date
  const purchaseQuery = `
    {
      ${crypto}(date: {eq: "${purchaseDate}"}) {
        price
      }
    }
  `;
  
  const saleQuery = `
    {
      ${crypto}(date: {eq: "${saleDate}"}) {
        price
      }
    }
  `;

  const url = `https://graphql.bitquery.io/`;

  const purchaseResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'BITQUERY-API-KEY': 'YOUR_API_KEY' // Will replace with actual API key once i get it
    },
    body: JSON.stringify({ query: purchaseQuery })
  });

  const saleResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'YOUR_API_KEY' // Replace with your actual API key
    },
    body: JSON.stringify({ query: saleQuery })
  });

  const purchaseData = await purchaseResponse.json();
  const saleData = await saleResponse.json();

  const purchasePrice = purchaseData.data[crypto][0].price;
  const salePrice = saleData.data[crypto][0].price;

  // Calculate the tax
  const purchaseValue = amountUsd;
  const saleValue = soldUsd;
  const capitalGain = saleValue - purchaseValue;
  const taxRate = 0.15; // Replace with your actual tax rate
  const taxOwed = capitalGain * taxRate;

  // Display the result
  resultDiv.textContent = `You owe $${taxOwed.toFixed(2)} in taxes on your ${crypto} transaction (purchased on ${purchaseDate} and sold on ${saleDate}).`;

});

// Retrieve the user's language preference and user agent string
const language = navigator.language;
const userAgent = navigator.userAgent;
console.log(`User language: ${language}`);
console.log(`User agent string: ${userAgent}`);