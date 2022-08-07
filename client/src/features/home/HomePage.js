import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { checkSession, getWorkers, getVehicles, clearMemory } from '../../actions';
import User from '../../models/user';

import Drawer from './Drawer';
import './HomePage.css';

function HomePage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkSession());
    }, [dispatch]);

    useEffect(() => {
        if (props.auth.user instanceof User && !props.auth.user.username) {
            navigate("/login");
            dispatch(clearMemory());
        }

        else {
            dispatch(getWorkers());
            dispatch(getVehicles());
        }
    }, [props.auth, navigate, dispatch]);


    return (
        <div className='home-page'>
            <Drawer />
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    );

}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(HomePage);
