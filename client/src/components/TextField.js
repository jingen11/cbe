import React from 'react';
import PropTypes from 'prop-types';
import './TextField.css';

function TextField(props) {
    return (
        <div className="field">
            <label className="header-6 semi-bold primary-color" htmlFor={props.fieldName}>{props.label}</label>
            <input className="body-text-2" type={props.type !== null ? props.type : "text"} value={props.value} name={props.fieldName} placeholder={props.placeholder} onChange={props.textOnChanged} />
        </div>
    );

}

TextField.propTypes = {
    fieldName: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    textOnChanged: PropTypes.func,
    type: PropTypes.string,
}

export default TextField;
