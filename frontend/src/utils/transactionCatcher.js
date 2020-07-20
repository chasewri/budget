export default function transactionCatcher(token, setFetchedTrans) {
    const queryBody = {
        query: `
          query {
            transactions(userId: "${token.userId}") {
              _id
              name
              description
              amount
              date 
              category {
                name
              }
  
            }
          }
        `,
      };
      fetch("/api", {
        method: "POST",
        body: JSON.stringify(queryBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          // console.log(resData.data.transactions);
          setFetchedTrans(resData.data.transactions);
        })
        .catch((err) => {
          console.log(err);
        });
  
  
}