import React from 'react'
import { withRouter } from "react-router-dom"
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import Cookie from "js-cookie"

function LogOut(props) {

    return (
        <>
            <span onClick={() => {
                Cookie.remove('token')
                props.history.push('/')
                props.isLogged(false)
            }}>
                <ExitToAppIcon fontSize="large" />
            </span>
        </>
    )
}

export default withRouter(LogOut)