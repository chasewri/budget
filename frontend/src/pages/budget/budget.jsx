import React, { useState, useContext, useEffect } from "react";
import Nav from "../../components/nav";
import Footer from '../../components/footer/footer'

import submitTransactions from "../../utils/submitTransactions";
import CategoryForm from "../../components/categoryForm/categoryForm";
import TransactionForm from "../../components/transactionForm/transactionForm";
import catCatcher from "../../utils/catCatcher";
import makeCats from "../../utils/makeCats";
import transactionCatcher from "../../utils/transactionCatcher";
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
    transactionCatcher(token, setFetchedTrans);
  }, []);

  useEffect(() => {
    catCatcher(token, setCats);
  }, [token]);

  const transSubmit = (e) => {
    e.preventDefault();
    // console.log(transName, description, amount, date, selectCat);
    submitTransactions(
      transName,
      description,
      amount,
      date,
      selectCat,
      token,
      transactionCatcher,
      setFetchedTrans
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makeCats(catCatcher, token, setCats, name, setName);
  };
  return (
    <>
      <Nav />
      <div className={style.main}>
        <div className="container">
          <CategoryForm
            handleSubmit={handleSubmit}
            setName={setName}
            name={name}
            title="Add Catagories Here"
          />

          {/* <h3>Categories are here???</h3>
      <ul>
      
        {!cats && <li> Loading Categories! </li>}
        {cats && cats.map((cat) => <li key={cat._id}>{cat.name}</li>)}
      </ul>

      <form>
        <select name="" id="">
          <option value="">Categories</option>
          {cats && cats.map((cat) => <option key={cat._id}>{cat.name}</option>)}
        </select>
      </form>  */}

          <hr />
          <hr />

          <TransactionForm
            title="Add Transactions"
            transSubmit={transSubmit}
            transName={transName}
            setTransName={setTransName}
            description={description}
            setDescription={setDescription}
            amount={amount}
            setAmount={setAmount}
            date={date}
            setDate={setDate}
            selectCat={selectCat}
            setSelectCat={setSelectCat}
            cats={cats}
          />

          <hr />
          <hr />

          <h3>Transaction data</h3>
          <h3>{/* You're current balance: {balance} */}</h3>
          <p> {!fetchedTrans && "loading.."} </p>
          <h3
            style={{
              color:
                fetchedTrans &&
                fetchedTrans
                  .map((tran) => tran.amount)
                  .reduce((a, b) => a + b, 0) > 0
                  ? "black"
                  : "red",
            }}
          >
            {fetchedTrans &&
              fetchedTrans
                .map((tran) => tran.amount)
                .reduce((a, b) => a + b, 0)}
          </h3>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Budget;
