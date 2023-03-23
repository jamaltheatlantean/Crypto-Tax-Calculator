function calculateTax() {
  const crypto = document.getElementById("crypto").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const tax = document.getElementById("tax");

  const url = `https://graphql.bitquery.io/`;

  const query = `
      {
        ethereum(network: bsc) {
          dexTrades(
            options: {limit: 1, desc: "timeInterval.minute"}
            date: {after: "${date}"}
            baseCurrency: {is: "${crypto}"}
          ) {
            timeInterval {
              minute(count: 1)
            }
            baseCurrency {
              symbol
            }
            quoteCurrency {
              symbol
            }
            baseAmount
            quoteAmount
            tradeAmount(in: USD)
            trades: count
          }
        }
      }
    `;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const price = data.data.ethereum.dexTrades[0].quoteAmount;
      const taxAmount = amount * price * 0.1;
      tax.value = `${taxAmount.toFixed(2)} USD`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
