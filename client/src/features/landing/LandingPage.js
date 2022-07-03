import React, { Component } from 'react';


import './LandingPage.css';

import Card from '../../components/Card';
import TextField from '../../components/TextField';
import Button from '../../components/Button';


class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <img className="background-img" src="/44630.svg" alt="background" />
                <div className="container">
                    <div className="page grid">
                        <div className="center flex flex-vertical">
                            <p className="header-1 bold italic primary-color">Cheam Brothers Enterprise</p>
                            <div className="spacer spacer-height-xl" />
                            <div className="login-card center">
                                <Card>
                                    <p className="header-3 bold primary-color">
                                        Login
                                </p>
                                    <div className="spacer spacer-height-lg" />
                                    <TextField label="Username" placeholder="Username" fieldName="Username" />
                                    <div className="spacer spacer-height-lg" />
                                    <TextField label="Password" placeholder="Password" fieldName="Password" />
                                    <div className="spacer spacer-height-lg" />
                                    <Button>
                                        <p className="body-text-2 bold">Login</p>
                                    </Button >
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
