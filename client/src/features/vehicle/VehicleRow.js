import React from 'react';
import {format} from 'date-fns';

import Card from '../../components/Card';

export default function Vehicle(props) {
    
  return (
    <Card className="list-row worker-row clickable" onClick={() => props.workerOnClick(props.vehicle)}>
      <div>
        <img className='avatar' src={`/vehicles/${props.vehicle.icImagePath}`} alt={props.vehicle.name} />
      </div>
      <div className='name-column'>
        <p className='header-6'>{props.vehicle.name}</p>
        <p className='body-text-2 light'>{props.vehicle.icNo}</p>
      </div>
      <div>
        <p className='body-text-2 light'>{props.vehicle.wage}</p>
      </div>
      <div>
        <p className='body-text-2 light'>{props.vehicle.phoneNumber}</p>
      </div>
      <div>
        <p className='body-text-2 light'>{format(props.vehicle.dateJoined? new Date(props.vehicle.dateJoined): Date.now(), 'dd/MM/yyyy')}</p>
      </div>
      <div>
        <p className='body-text-2 light'>{props.vehicle.vehicle}</p>
      </div>
    </Card>
  );
}
