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

  useEffect(() => {
    catCatcher(token, setCats);
  }, []);

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
        {!cats && <li> Loading Categories! </li>}
        {cats && cats.map((cat) => <li key={cat._id}>{cat.name}</li>)}
      </ul>
    </div>
  );
}

export default Budget;
