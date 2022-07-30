import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './LandingPage.css';

import Card from '../../components/Card';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

import { loginUser } from '../../actions';
import User from '../../models/user';


class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state =
        {
            username: "",
            password: "",
            errorText: "",
        };

        this.login = this.login.bind(this);
        this.usernameOnChange = this.usernameOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
    }

    componentDidUpdate(previousProps, previousState) {
        if (this.props.auth.user instanceof User && this.props.auth.user.username)
            this.props.navigate("/", { replace: true });

        if (previousProps.auth.error !== this.props.auth.error)
            this.setState({ errorText: this.props.auth.error });
    }

    usernameOnChange(e) {
        this.setState({ username: e.target.value, errorText: "" });
    }

    passwordOnChange(e) {
        this.setState({ password: e.target.value, errorText: "" });
    }

    login(e) {
        e.preventDefault();

        if (this.state.username === "" || this.state.password === "") {
            this.setState({ errorText: "username or password cannot be empty" });
            return;
        }

        this.props.dispatch(loginUser({ username: this.state.username, password: this.state.password }));
    }

    render() {
        const hasError = this.state.errorText !== "";
        return (
            <div className="landing-page">
                <img className="background-img" src="/assets/login.svg" alt="background" />
                <div className="container">
                    <div className="page grid">
                        <div className="center flex flex-vertical">
                            <p className="header-1 bold italic primary-color">Cheam Brothers Enterprise</p>
                            <div className="spacer spacer-height-xl" />
                            <Card className='login-card center'>
                                <p className="header-3 bold primary-color">
                                    Login
                                </p>
                                <div className="spacer spacer-height-lg" />
                                <TextField label="Username" placeholder="Username" fieldName="Username" textOnChanged={this.usernameOnChange} />
                                <div className="spacer spacer-height-lg" />
                                <TextField label="Password" placeholder="Password" fieldName="Password" type="password" textOnChanged={this.passwordOnChange} />
                                <div className="spacer spacer-height-lg" />
                                <Button onClick={this.login}>
                                    <p className="body-text-2 bold">Login</p>
                                </Button >
                                <div className="spacer spacer-height-sm" />
                                <p className={`body-text-1 error-text ${hasError ? "error-text--active" : ""}`}>{hasError ? this.state.errorText : "error placeholder"}</p>
                            </Card>

                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

function WithNavigate(props) {
    let navigate = useNavigate();
    return <LandingPage {...props} navigate={navigate} />
}

export default connect(mapStateToProps, null)(WithNavigate);
