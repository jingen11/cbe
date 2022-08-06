import React from 'react';
import {format} from 'date-fns';

import Card from '../../components/Card';

export default function VehicleRow(props) {
    
  return (
    <Card className="list-row vehicle-row clickable" onClick={() => props.vehicleOnClick(props.vehicle)}>
        <p className='body-text-2 light'>{props.vehicle.registrationNum}</p>
        <p className='body-text-2 light'>{format( new Date(props.vehicle.roadTaxExpDate), 'dd/MM/yyyy')}</p>
        <p className='body-text-2 light'>{format( new Date(props.vehicle.puspakomExpDate), 'dd/MM/yyyy')}</p>
        <p className='body-text-2 light'>{props.vehicle.petrolCardNum}</p>
        <p className='body-text-2 light'>{props.vehicle.touchNGoCardNum}</p>
     </Card>
  );
}
