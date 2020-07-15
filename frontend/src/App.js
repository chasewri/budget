import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import IndexPage from './pages/indexPage'



function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/' component={IndexPage} exact />
    </Switch>
    </BrowserRouter>
  )
}

export default App;
