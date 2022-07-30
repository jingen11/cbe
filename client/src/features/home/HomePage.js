import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Button from '../../components/Button';
import { logOut, checkSession } from '../../actions';
import User from '../../models/user';

function HomePage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => { 
        dispatch(checkSession());
    },[]);

    useEffect(() => {
        if( props.auth.user instanceof User && !props.auth.user.username ){
            navigate( "/" );
        }
    }, [props.auth]);

    const _logOut = function(){
        dispatch(logOut());
    }
   
    return (
        <div>
            <Button onClick={_logOut}> LogOut </Button>
        </div>
    );

}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(HomePage);
