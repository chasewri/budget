export default function makeCats(catCatcher, token, setCats, name, setName, handleCatClose) {
    console.log(name);

    if (name.trim().length === 0) {
      return;
    }

    let queryBody = {
      query:`
        mutation {
            createCategory(categoryInput: {name: "${name}", id: "${token.userId}" }) {
                name
                _id
            }
        }
      `
    };

    fetch("/api", {
      method: "POST",
      body: JSON.stringify(queryBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
        console.log(res);
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setName('')
        catCatcher(token, setCats)
        handleCatClose()
      })
      .catch((err) => {
        console.log(err);
      });
}