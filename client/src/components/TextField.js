import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextField.css';

class TextField extends Component {
    render() {
        return (
            <div className="field">
                <label className="header-6 semi-bold primary-color" htmlFor={this.props.fieldName}>{this.props.label}</label>
                <input className="body-text-2" type={this.props.type !== null ? this.props.type : "text"} name={this.props.fieldName} placeholder={this.props.placeholder} onChange={this.props.textOnChanged} />
            </div>
        );
    }
}

TextField.propTypes = {
    fieldName: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
}

export default TextField;
