import React, { useState, useContext, useEffect } from "react";
import d3 from "d3";
import Nav from "../../components/nav";
import Footer from "../../components/footer/footer";
import colors from 'britecharts/dist/umd/colors.min.js'

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


import Modal from '../../components/modal/transactionModal'

function Budget() {
  const ResponsiveDonut = withResponsiveness(Donut);
  const ResponsiveSparkline = withResponsiveness(Sparkline);
  const ResponsiveLine = withResponsiveness(Line);

  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const { token } = useContext(AuthContext);

  const { height, width } = windowDimensions();


  const [addTransaction, setAddTransaction] = useState(false)
  const [addCategory, setAddCategory] = useState(false)

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


    // -----------------------------------modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // ---------------------------------
    const greenBlue = ['#2E3F5d', '#2E3F5d']
    const white = ['#FFF', '#FFF']

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
                  color: fetchedTrans && currentBalance() >= 0 ? "black" : "red",
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
                  </tr>
                </thead>
                <tbody>
                  {!fetchedTrans && 
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  }
                  {fetchedTrans && fetchedTrans.slice(0,10).map(trans => (
                    <tr key={trans._id}>
                        <td style={{textTransform: 'capitalize', fontSize: '1.25rem'}}>{trans.name}</td>
                        <td style={{color: trans.amount > 0 ? 'black' : 'red'}}>${trans.amount.toFixed(2)}</td>
                        <td>{trans.date.split(',')[0]}</td>
                    </tr>
                  ))
                   
                  }
                </tbody>
              </table>

            </div>
            <div className='col-sm-1'></div>
            <div id="doc" className="col-sm-7">

              <Modal show={show} handleClose={handleClose} >
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

              </Modal>
              <h3>
            
                Recent Transactions
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
                  height={height*2/3}
                  width={width/2}
                  areaGradient={white}
                  lineGradient={white}
                />
                :
                <ResponsiveLine data={null} shouldShowLoadingState={true} />
              }
            </div>
          </div>
        </div>
        <Footer>
        <button onClick={handleShow} className="button btn btn-lg btn-light">Add Transaction</button>
        <button style={{marginLeft: '5rem'}} onClick={handleShow} className="button btn btn-lg btn-light">Add Category</button>
          
        </Footer>
      </div>

      

    </>
  );
}

export default Budget;
