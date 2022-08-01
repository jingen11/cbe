import React from 'react';
import {format} from 'date-fns';

import Card from '../../components/Card';

export default function WorkerRow(props) {
  return (
    <Card className="list-row worker-row clickable" onClick={() => props.workerOnClick(props.worker)}>
      <div>
        <img className='avatar' src={`/workers/${props.worker.icImagePath}`} alt={props.worker.name} />
      </div>
      <div className='name-column'>
        <p className='header-6'>{props.worker.name}</p>
        <p className='body-text-2 light'>{props.worker.icNo}</p>
      </div>
      <div>
        <p className='body-text-2 light'>{props.worker.wage}</p>
      </div>
      <div>
        <p className='body-text-2 light'>{props.worker.phoneNumber}</p>
      </div>
      <div>
        <p className='body-text-2 light'>{format(props.worker.dateJoined? new Date(props.worker.dateJoined): Date.now(), 'dd/MM/yyyy')}</p>
      </div>
      <div>
        <p className='body-text-2 light'>{props.worker.vehicle}</p>
      </div>
    </Card>
  );
}
