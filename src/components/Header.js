import React from 'react'
import LogOut from './LogOut'
import Cookie from "js-cookie"

import logo from '../logg.svg'

function Welcome(props) {
    return (
        <div className="App-header-container">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="App-logout">
                {Cookie.get("token") && (
                    <LogOut isLogged={props.isLogged} />
                )}
            </div>
        </div>
    )
}

export default Welcome