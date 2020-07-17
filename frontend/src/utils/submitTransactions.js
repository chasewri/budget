export default function submitTransactions(transName, description, amount, date, selectCat, token, transactionCatcher, setFetchedTrans) {

    if (transName.trim().length === 0) {
        return;
      }
  
      const queryBody = {
        query: `
          mutation {
            createTransaction(transactionInput: {
              name: "${transName}",
              description: "${description}",
              amount: ${amount},
              date: "${date}",
              category: "${selectCat}",
              user: "${token.userId}"
            }) {
              _id
              name
              description
              amount
         
            }
          }
        `,
      };
      fetch("http://localhost:3001/api", {
        method: "POST",
        body: JSON.stringify(queryBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((resData) => {
          console.log(resData);
          transactionCatcher(token, setFetchedTrans);
        })
        .catch((err) => {
          console.log(err);
        });


}