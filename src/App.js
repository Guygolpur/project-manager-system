import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Header from './components/Header'
import AlertComponent from './components/AlertComponent'
import Footer from './components/Footer'
import Login from './screens/Login'
import './App.css'

function App() {

  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
      <Header />
      <div className="container d-flex align-items-center flex-column">
        <Switch>
          <Route path="/" showError={updateErrorMessage} exact={true}>
            <Login showError={updateErrorMessage}>
              <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
            </Login>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
