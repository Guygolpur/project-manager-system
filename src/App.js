import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Cookie from "js-cookie"

import Header from './components/Header'
import AlertComponent from './components/AlertComponent'
import Footer from './components/Footer'
import Login from './screens/Login'
import Home from './screens/Home'
import './App.css'

function App() {

  const [errorMessage, updateErrorMessage] = useState(null)
  const [loggedIn, updateLoggedIn] = useState(false)

  useEffect(() => {
    if (Cookie.get("token")) {
      updateLoggedIn(true)
    }
    else {
      updateLoggedIn(false)
    }
  }, [])

  const isLogged = (childResponse) => {
    updateLoggedIn(childResponse)
  }

  return (
    <Router>
      <Header isLogged={isLogged} />
      <div className="container d-flex align-items-center flex-column">
        <Switch>

          <Route path="/" showError={updateErrorMessage} exact={true}>
            {loggedIn ? <Redirect to="/info" /> : <Login showError={updateErrorMessage} isLogged={isLogged}>
              <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
            </Login>}
          </Route>

          <Route path="/info">
            {loggedIn ? <Home /> : <Redirect to="/" />}
          </Route>

        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
