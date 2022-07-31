import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import './Modal.css';

export default function Modal(props) {
  return (
    <ReactModal
      isOpen={props.isOpen}
      contentLabel="New Worker Modal"
      parentSelector={() => document.querySelector(props.parent)}
      onRequestClose={props.closeModal}
      closeTimeoutMS={200}
      overlayClassName='modal-background'
      className='modal'
      ariaHideApp={false}
    >
      {props.children}
    </ReactModal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  parent: PropTypes.string,
  closeModal: PropTypes.func,
}
