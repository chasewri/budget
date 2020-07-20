import React from "react";

function Placeholder() {
  return (
    <div>
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



      
    </div>
  );
}

export default Placeholder;
