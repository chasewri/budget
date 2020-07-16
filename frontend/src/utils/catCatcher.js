
function catCatcher( token, setCats) {

const queryBody = {
    query: `
        query {
            categories(userId: "${token.userId}") {
                name
                _id
            }
        }
    `
}
fetch("http://localhost:3001/api", {
    method: "POST",
    body: JSON.stringify(queryBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(resData => {
        console.log(resData)
        setCats(resData.data.categories)
    })
    .catch(err => {
        console.log(err)
    
    })
}
export default catCatcher