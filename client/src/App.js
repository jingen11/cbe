import React, {useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { connect , useDispatch } from 'react-redux';

import {checkSession} from './actions';
import User from './models/user';
// import Header from "./Header";
import "./App.css";

function App(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(checkSession());
    },[dispatch]);

    useEffect(()=>{
        if( props.auth.user instanceof User && props.auth.user.username ){
            navigate( "/home" );
        }
    },[props.auth, navigate]);

    return (
        <div>
            {/* <Header /> */}
            <div className="ui bottom attached segment my-layout">
                <Outlet />
            </div>
        </div>
    );
    
}


const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(App);