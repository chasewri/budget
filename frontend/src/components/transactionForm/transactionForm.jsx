import React from "react";
import "./transForm.scss";

function TransactionForm({
  title,
  transSubmit,
  transName,
  setTransName,
  description,
  setDescription,
  amount,
  setAmount,
  date,
  setDate,
  selectCat,
  setSelectCat,
  cats,
}) {
  return (
    <div className="transForm">
      <h3>{title}</h3>

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
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Date</label>
          <input
            className="form-control"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
        </div>

        <div className="form-group">
          <select
            className="form-control"
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

        <button className="btn btn-lg btn-light button" type="submit">
          Submit Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
