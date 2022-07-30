import React from 'react';

import Card from '../../components/Card';

export default function WorkerRow() {
  return (
    <Card className="list-row worker-row clickable" onClick={() => console.log('dsdsdd')}>
      <div>
        <img className='avatar' src='/assets/je.png' alt='cheam jing en' />
      </div>
      <div className='name-column'>
        <p className='header-6'>Cheam Jing-En</p>
        <p className='body-text-2 light'>960410-07-5565</p>
      </div>
      <div>
        <p className='body-text-2 light'>70</p>
      </div>
      <div>
        <p className='body-text-2 light'>0125138019</p>
      </div>
      <div>
        <p className='body-text-2 light'>10.04.1996</p>
      </div>
      <div>
        <p className='body-text-2 light'>PLV 6874</p>
      </div>
    </Card>
  );
}
