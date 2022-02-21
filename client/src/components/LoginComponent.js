import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            response: null
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLogin(e) {
        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((res) => {
                //make sure you return functions that returns promises
                //to chain .then statements
                return res.json();
            })
            .then((res) => {
                console.log(res);
                this.props.dispatch({
                    type: 'LOGIN'
                });
            });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <>
                <form>
                    <h1>Login</h1>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        name="email"
                        placeholder={this.email}
                        onChange={this.handleEmailChange}
                    />
                    <br />
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        placeholder={this.password}
                        onChange={this.handlePasswordChange}
                    />
                    <br />
                    <button type="button" onClick={this.handleLogin}>
                        Login
                    </button>
                </form>
            </>
        );
    }
}

//function for loading required element from store
const mapStateToProps = (state) => {
    return { activeSession: state.activeSession };
};

//function for loading dispatch object from store
const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

//connect connects the redux functions and passes the return values as props
//to the class component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
