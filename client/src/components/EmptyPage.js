import React from 'react';
import PropTypes from 'prop-types';

import './EmptyPage.css';

export default function EmptyPage(props) {
  return (
    <div className={`empty-page flex flex-vertical ${props.className}`}>
      <img className='empty-page-icon' src='/assets/icons/not_found.svg' alt='not-found-icon' />
      <p className='header-6'>{props.description}</p>
    </div>
  );
}

EmptyPage.propTypes = {
  description: PropTypes.string,
}
