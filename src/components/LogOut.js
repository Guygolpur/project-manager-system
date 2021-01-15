import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import * as AuthActions from '../store/actions/authActions'

import Cookie from "js-cookie"

function LogOut(props) {

    return (
        <div>
            <span onClick={() => {
                Cookie.remove('token')
                props.login({})
                props.history.push('/')
                props.isLogged(false)
            }}>
                <ExitToAppIcon fontSize="large" />
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (authObj) => {
            dispatch(AuthActions.login({ authObj }))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LogOut))
