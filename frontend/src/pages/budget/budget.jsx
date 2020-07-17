import React, { useState, useContext, useEffect } from "react";
import d3 from "d3";
import Nav from "../../components/nav";
import Footer from "../../components/footer/footer";

import windowDimensions from "../../utils/windowDimensions";

import { Donut, withResponsiveness, Sparkline, Line } from "britecharts-react";

import submitTransactions from "../../utils/submitTransactions";
import CategoryForm from "../../components/categoryForm/categoryForm";
import TransactionForm from "../../components/transactionForm/transactionForm";
import catCatcher from "../../utils/catCatcher";
import makeCats from "../../utils/makeCats";
import transactionCatcher from "../../utils/transactionCatcher";
import AuthContext from "../../context/auth-context";
import style from "./budgetPage.module.scss";

function Budget() {
  const ResponsiveDonut = withResponsiveness(Donut);
  const ResponsiveSparkline = withResponsiveness(Sparkline);
  const ResponsiveLine = withResponsiveness(Line);

  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const { token } = useContext(AuthContext);

  const { height, width } = windowDimensions();

  const currentBalance = () => {
    return fetchedTrans.map((tran) => tran.amount).reduce((a, b) => a + b, 0);
  };
  const lookAtData = () => {
     console.log(fetchedTrans)
  }
  const dataForSparkle = () => {
    return fetchedTrans.map((tran) => {
      return {value: tran.amount, date: tran.date.split(',')[0] }
    });
  };


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
                  color: fetchedTrans && currentBalance() > 0 ? "black" : "red",
                }}
              >
                {fetchedTrans && currentBalance()}
              </h3>
            </div>
            <div id="doc" className="col-8">
              <h3>
                {" "}
                width: {width} ~ height: {height}
              </h3>

            
              {/* <ResponsiveDonut 
                      data={[]}
                      shouldShowLoadingState={true}
                    
                    />  */}


              {fetchedTrans && console.log([dataForSparkle()], [dataForSparkle()][0].length)}
              {fetchedTrans && lookAtData()}
              { ([dataForSparkle()][0].length) ?
                <ResponsiveSparkline
                  data={[dataForSparkle()][0]}
                  isAnimated={true}
                  duration={2000}
                  height={height*4/5}
                />
                :
                <ResponsiveLine data={null} shouldShowLoadingState={true} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Budget;
