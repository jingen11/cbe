import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';

function IconButton(props) {
  return (<button className={`icon-button ${props.className}`} type="button" onClick={props.onClick}>
    {props.children}
  </button>);
}

IconButton.propTypes = {
  onClick: PropTypes.func,
}

export default IconButton;
