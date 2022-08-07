import React from 'react';
import PropTypes from 'prop-types';

import './Field.css';

export default function Dropdown(props) {
    return (
        <div className="field dropdown-field">
            <label className="header-6 semi-bold primary-color" htmlFor={props.fieldName}>{props.label}</label>
            <select defaultValue="" value={props.value} name={props.name} className="body-text-2" onChange={props.onChanged}>
                <option value="" key={0}>
                    --Assign to Vehicle--
                </option>
                {props.selections.map((selection, index) => {
                    return (<option value={selection.value} key={index + 1}>
                        {selection.name}
                    </option>);
                })}
            </select>
            <svg className='dropdown-arrow' xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
                <path fill="currentColor" fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
            </svg>
        </div>
    );
}

Dropdown.propTypes = {
    fieldName: PropTypes.string,
    label: PropTypes.string,
    onChanged: PropTypes.func,
    selections: PropTypes.array,
}
