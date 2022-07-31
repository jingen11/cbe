import React from 'react';
import PropTypes from 'prop-types';
import './FloatingActionButton.css';

function FloatingActionButton(props) {
  return (<button className="floating-action-button" type="button" onClick={props.onClick}>
    {props.children}
  </button>);
}

FloatingActionButton.propTypes = {
  onClick: PropTypes.func,
}

export default FloatingActionButton;
