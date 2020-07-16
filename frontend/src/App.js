import React from "react";
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import IndexPage from './pages/indexPage'



function App() {
  const history = useHistory()

  return (
    <BrowserRouter>
    <Switch>
      <Route path='/' component={IndexPage}  />
    </Switch>
    </BrowserRouter>
  )
}

export default App;
