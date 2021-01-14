import React, { useState } from 'react'
import LogOut from './LogOut'

import logo from '../logo.svg';

function Welcome(props) {
    return (
        <div className="App-header-container">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="App-logout">
                <LogOut isLogged={props.isLogged}/>
            </div>
        </div>
    )
}

export default Welcome