import React, { useState, useContext, useEffect } from "react";
import d3 from "d3";
import Nav from "../../components/nav";
import Footer from "../../components/footer/footer";

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
  // ------------d3----------------
  // const d3Data = [10, 15, 20, 25, 50];
  // const doc = d3.select("#doc");
  // const svg = doc.append("svg").attr("width", 800).attr("height", 400);
  // const colors = d3.scale.category10();
  // const circles = svg.selectAll("circle").data(data).enter().append("circle").attr('cx', function(d, i) )

  // ------------------------------------------
  return (
    <>
      <Nav />
      <div className={style.main}>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <p> {!fetchedTrans && "loading.."} </p>
              <h3
                className="balance"
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
            <div id="doc" className="col-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Budget;
