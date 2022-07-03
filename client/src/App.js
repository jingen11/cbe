import React, { Component } from "react";
import { Outlet } from "react-router-dom";
// import Header from "./Header";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div>
                {/* <Header /> */}
                <div className="ui bottom attached segment my-layout">
                    <Outlet />
                </div>
            </div>
        );
    }
}


export default App;