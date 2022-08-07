import React from 'react';
import PropTypes from 'prop-types';

import './Field.css';

export default function Dropdown(props) {
    return (
        <div className="field">
        <label className="header-6 semi-bold primary-color" htmlFor={props.fieldName}>{props.label}</label>
        <select ></select>
    </div>
    );
}

Dropdown.propTypes = {
    fieldName: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    textOnChanged: PropTypes.func,
    type: PropTypes.string,
}
