import React, { useState, useContext, useEffect } from "react";
import d3 from "d3";
import Nav from "../../components/nav";
import Footer from "../../components/footer/footer";
import colors from "britecharts/dist/umd/colors.min.js";

import windowDimensions from "../../utils/windowDimensions";

import {
  Donut,
  withResponsiveness,
  Sparkline,
  GroupedBar,
  StackedBar,
} from "britecharts-react";

import submitTransactions from "../../utils/submitTransactions";
import CategoryForm from "../../components/categoryForm/categoryForm";
import TransactionForm from "../../components/transactionForm/transactionForm";
import catCatcher from "../../utils/catCatcher";
import makeCats from "../../utils/makeCats";
import transactionCatcher from "../../utils/transactionCatcher";
import AuthContext from "../../context/auth-context";
import style from "./budgetPage.module.scss";

import Modal from "../../components/modal/transactionModal";

function Budget() {
  const ResponsiveDonut = withResponsiveness(Donut);
  const ResponsiveSparkline = withResponsiveness(Sparkline);

  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const { token } = useContext(AuthContext);

  const { height, width } = windowDimensions();

  const [addTransaction, setAddTransaction] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  const currentBalance = () => {
    return fetchedTrans.map((tran) => tran.amount).reduce((a, b) => a + b, 0);
  };

  const lastTenTrans = () => {
    return fetchedTrans
      .slice(0, 10)
      .map((tran) => Math.abs(tran.amount))
      .reduce((a, b) => a + b, 0);
  };
  const lookAtData = () => {
    console.log(fetchedTrans);
  };
  const negativeTrans = () => {
    return fetchedTrans.filter(tran => tran.amount < 0)
  }
  const dataForBar = () => {
    return negativeTrans()
      .map((tran) => {
        return {
          name: tran.category.name,
          stack: tran.date.split(",")[0],
          value: Math.abs(tran.amount),
        };
      });
  };
  const dataForSparkle = () => {
    return fetchedTrans.map((tran) => {
      return { value: tran.amount, date: tran.date.split(",")[0] };
    });
  };

  const dataForDonut = () => {
    return fetchedTrans.slice(0, 10).map((trans) => {
      const total = lastTenTrans();
      const absAmount = Math.abs(trans.amount);
      const percent = absAmount / total.toFixed(1) / 50;
      return { quantity: percent, name: `${trans.name}, $${trans.amount}` };
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
  }, []);

  // -----------------------------------modal
  // ---- add transaction modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ---------------------------------
  // ----- add catagory modal
  const [catShow, setCatShow] = useState(false);
  const handleCatClose = () => setCatShow(false);
  const handleCatShow = () => setCatShow(true);

  // ------------------------------------
  // doghnut color schemes
  const greenBlue = ["#2E3F5d", "#2E3F5d"];
  const white = ["#FFF", "#FFF"];

  const [barDisplay, setBarDisplay] = useState(false);

  const chartDisplay = () => {
    setBarDisplay(!barDisplay);
  };

  const showChart = {
    display: "block",
  };
  const hideChart = {
    display: "none",
  };

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
    setTransName("");
    setDescription("");
    setAmount("");
    setDate("");
    setShow(!show);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makeCats(catCatcher, token, setCats, name, setName, handleCatClose);
  };
  // ------------------------------------ del transaction
  function deleteTransaction(id) {
    console.log(id);
    const delId = id;
    const queryBody = {
      query: `
        mutation {
          deleteTransaction(_id: "${delId}") {
                name
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
        console.log(res);
        transactionCatcher(token, setFetchedTrans);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // --------------- del category --------------------------------------
  function deleteCategory(id) {
    console.log(id);
    const delId = id;
    const queryBody = {
      query: `
      mutation {
        deleteCategory(_id: "${delId}") {
          name
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
        console.log(res);
        catCatcher(token, setCats);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // -----------------------return -------------------------------------------
  return (
    <>
      <Nav />
      <div className={style.main}>
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col-sm-4">
              <p> {!fetchedTrans && "loading.."} </p>
              <h3
                className="balance"
                style={{
                  color:
                    fetchedTrans && currentBalance() >= 0 ? "black" : "red",
                }}
              >
                Current Balance: ${fetchedTrans && currentBalance().toFixed(2)}
              </h3>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Transaction</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {!fetchedTrans && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {fetchedTrans &&
                    fetchedTrans.slice(0, 10).map((trans) => (
                      <tr key={trans._id}>
                        <td
                          style={{
                            textTransform: "capitalize",
                            fontSize: "1.25rem",
                          }}
                        >
                          {trans.name}
                        </td>
                        <td
                          style={{ color: trans.amount > 0 ? "black" : "red" }}
                        >
                          ${trans.amount.toFixed(2)}
                        </td>
                        <td>{trans.date.split(",")[0]}</td>
                        <td>
                          <button
                            onClick={() => deleteTransaction(trans._id)}
                            className="btn btn-sm btn-warning"
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="col-sm-1"></div>
            <div id="doc" className="col-sm-7">
              <h3>Recent Transactions</h3>

              {/* {fetchedTrans &&
                console.log([dataForSparkle()], [dataForSparkle()][0].length)} */}
              {fetchedTrans && lookAtData()}
              {dataForDonut().length ? (
                // <ResponsiveSparkline
                //   data={dataForSparkle()}
                //   isAnimated={true}
                //   duration={2000}
                //   height={height*1/3}
                //   width={width/2}
                //   areaGradient={white}
                //   lineGradient={white}
                // />
                <div>
                  <div style={barDisplay ? showChart : hideChart}>
                    <ResponsiveDonut
                      data={dataForDonut()}
                      height={height}
                      width={height}
                      externalRadius={height / 3}
                      internalRadius={height / 10}
                    />
                  </div>

                  <div style={barDisplay ? hideChart : showChart}>
                    <StackedBar
                      data={dataForBar()}
                      isHorizontal={true}
                      width={width / 2.5}
                      height={height / 1.5}
                    />
                  </div>
                </div>
              ) : (
                <GroupedBar
                  data={null}
                  isHorizontal={true}
                  shouldShowLoadingState={true}
                />
              )}
            </div>
          </div>
          {/* modal ------------------------------------- */}
          <Modal show={show} handleClose={handleClose}>
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
              handleClose={handleClose}
            />
          </Modal>

          <Modal
            show={catShow}
            handleClose={handleCatClose}
            deleteCategory={deleteCategory}
          >
            <CategoryForm
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
              handleCatClose={handleCatClose}
            />
            <h3>Current Categories:</h3>
            <table className="table table-striped catTable">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {cats.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    <td>
                      <button
                        onClick={() => deleteCategory(cat._id)}
                        className="btn btn-sm btn-warning"
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal>
          {/* modals ---------------------------------------------------- */}
        </div>
        <Footer>
          <button onClick={handleShow} className="button btn btn-lg btn-light">
            Add Transaction
          </button>
          <button
            style={{ marginLeft: "5rem" }}
            onClick={handleCatShow}
            className="button btn btn-lg btn-light"
          >
            Add Category
          </button>
          <button
            style={{ marginLeft: "5rem" }}
            onClick={chartDisplay}
            className="button btn btn-lg btn-light"
          >
            {barDisplay ? "Bar Chart" : "Donut Chart"}
          </button>
        </Footer>
      </div>
    </>
  );
}

export default Budget;
