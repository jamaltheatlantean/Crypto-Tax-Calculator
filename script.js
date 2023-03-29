const form = document.querySelector("form");
const resultDiv = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const crypto = document.querySelector("#crypto").value;
  const amountUsd = document.querySelector("#amount-usd").value;
  const soldUsd = document.querySelector("#sold-usd").value;
  const purchaseDate = document.querySelector("#purchaseDate").value;
  const saleDate = document.querySelector("#saleDate").value;

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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "BQYgbliUSjLJlBzRVKqe0HNY4vtybLGt", // Will replace with actual API key once i get it
    },
    body: JSON.stringify({ query: purchaseQuery }),
  });

  const saleResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "BQYgbliUSjLJlBzRVKqe0HNY4vtybLGt", // Replace with your actual API key
    },
    body: JSON.stringify({ query: saleQuery }),
  });

  const purchaseData = await purchaseResponse.json();
  const saleData = await saleResponse.json();

  //const purchasePrice = purchaseData.data[crypto][0].price;
  //const salePrice = saleData.data[crypto][0].price;

  // Calculate the tax
  const purchaseValue = amountUsd;
  const saleValue = soldUsd;
  const capitalGain = saleValue - purchaseValue;
  const taxRate = 0.15; // Replace with your actual tax rate
  const taxOwed = capitalGain * taxRate;

  // Display the result
  resultDiv.textContent = `You owe $${taxOwed.toFixed(
    2
  )} in taxes on your ${crypto} transaction (purchased on ${purchaseDate} and sold on ${saleDate}).`;
});

// Retrieve the user's language preference and user agent string
const language = navigator.language;
const userAgent = navigator.userAgent;
console.log(`User language: ${language}`);
console.log(`User agent string: ${userAgent}`);
