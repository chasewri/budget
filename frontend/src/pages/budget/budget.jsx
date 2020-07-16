import React, { useState, useContext, useEffect } from "react";
import Nav from "../../components/nav";

import catCatcher from "../../utils/catCatcher";
import makeCats from "../../utils/makeCats";

import AuthContext from "../../context/auth-context";
import style from "./budgetPage.module.scss";

function Budget() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const { token } = useContext(AuthContext);

  // all the transaction state/setStates
  const [transName, setTransName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [selectCat, setSelectCat] = useState({ value: "start" });

  // -----------------------------------
  // fetch transactions
  const [fetchedTrans, setFetchedTrans] = useState([]);

  useEffect(() => {
    const queryBody = {
      query: `
        query {
          transactions(userId: "${token.userId}") {
            _id
            name
            description
            amount
            date

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
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // --------------------------------
  useEffect(() => {
    catCatcher(token, setCats);
  }, []);

  const transSubmit = (e) => {
    e.preventDefault();
    console.log(transName, description, amount, date, selectCat);

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makeCats(catCatcher, token, setCats, name, setName);
  };
  return (
    <div className={style.budgetPage}>
      <Nav />
      <h1>Here is the budget placeholder page</h1>

      <form onSubmit={handleSubmit}>
        <h3>Create a category</h3>
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-lg btn-light">
          Create Cateogry
        </button>
      </form>

      <h3>Categories are here???</h3>
      <ul>
        {/* placeholder lets have some nice loading in the future */}
        {!cats && <li> Loading Categories! </li>}
        {cats && cats.map((cat) => <li key={cat._id}>{cat.name}</li>)}
      </ul>

      <form>
        <select name="" id="">
          <option value="">Categories</option>
          {cats && cats.map((cat) => <option key={cat._id}>{cat.name}</option>)}
        </select>
      </form>

      <hr />
      <hr />

      <h3>Here we can add some transactions</h3>

      <form onSubmit={transSubmit}>
        <div className="form-group">
          <label htmlFor="name">Transaction Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Transaction Name"
            value={transName}
            onChange={(e) => setTransName(e.target.value)}
          />

          <label htmlFor="description">Description (optional)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="amount">Amount</label>
          <input
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />

          <label htmlFor="name">Date</label>
          <input
            className="form-control"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />

          <select
            value={selectCat}
            onChange={(e) => setSelectCat(e.target.value)}
          >
            <option value="start">Select Category</option>
            {cats &&
              cats.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
}

export default Budget;
