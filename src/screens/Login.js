import React, { useState } from 'react'
import { withRouter } from "react-router-dom"
import axios from 'axios'
import { CircularProgress } from '@material-ui/core'

const API_BASE_URL = 'https://private-052d6-testapi4528.apiary-mock.com/authenticate'

function Login(props) {

    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null,
        isLoading: false
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault()
        let isEmailValidate, isPasswordValidate = false
        isEmailValidate = emailValidation()
        isPasswordValidate = passwordValidation()
        if (isEmailValidate && isPasswordValidate) {
            setState({ isLoading: true })
            sendDetailsToServer()
        }

    }

    const emailValidation = () => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(state.email)) {
            props.showError('Email address is not valid')
            return false
        }
        else {
            return true
        }
    };

    const passwordValidation = () => {
        var pattern = new RegExp(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)

        if (!pattern.test(state.password)) {
            props.showError('Password is not valid')
            return false
        }
        else {
            return true
        }
    };

    const sendDetailsToServer = () => {
        props.showError(null);
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        axios.post(API_BASE_URL, payload)
            .then(function (response) {
                if (response.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Registration successful. Redirecting to home page..'
                    }))
                    setState({ isLoading: false })
                    // redirectToHome();
                    props.showError(null)
                } else {
                    setState({ isLoading: false })
                    props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                setState({ isLoading: false })
                console.log(error);
            });
    }

    return (
        <div className="App-login">
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                <form>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                        <small>Password must be at least 8 charecters long, one uppercase and one numeric character </small>
                    </div>
                    {state.isLoading ?
                        < CircularProgress /> :
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmitClick}
                            disabled={!(state.email && state.password)}
                        >
                            Register
                        </button>
                    }
                    {props.children}
                </form>
            </div>
        </div>
    )
}

export default Login