import React from 'react';
import PropTypes from 'prop-types';

import { format, isAfter } from 'date-fns';

export default function DateCard(props) {
  const isFuture = isAfter(new Date(), props.date);

  return (
    <div className={`date-card ${props.isSelected ? 'date-card--selected' : ''} ${isFuture ? 'clickable' : 'date-card--future'}`}
      onClick={isFuture ? () => props.onClick() : null}>
      <div className='flex flex-center body-text-2 bold '>
        {format(props.date, 'dd')}
      </div>
      <div className='spacer spacer-height-sm' />
      <div className='flex flex-center body-text-1 '>
        {format(props.date, 'LLL')}
      </div>
    </div>
  )
}

DateCard.propTypes = {
  date: PropTypes.instanceOf(Date),
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}
