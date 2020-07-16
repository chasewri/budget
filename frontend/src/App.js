import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import IndexPage from "./pages/indexPage";
import SignUp from "./pages/signUp/signUp";
import Budget from "./pages/budget/budget";
import AuthContext from "./context/auth-context";

function App() {
  const [userAuth, setUserAuth] = useState({
    token: null,
    userId: null,
  });

  const history = useHistory();

  const login = (token, userId, tokenExpiration) => {
    setUserAuth({
      token: token,
      userId: userId,
    });
  };

  const logout = () => {
    setUserAuth({
      token: null,
      userId: null,
    });
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          token: userAuth.token,
          userId: userAuth.userId,
          login,
          logout,
        }}
      >
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/login" component={SignUp} exact />
          <Route path="/budget" exact>
            {!userAuth.token ? <Redirect to="/login" /> : <Budget />}
          </Route>
          <Route path="/:random">
            <Redirect to="/" />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
