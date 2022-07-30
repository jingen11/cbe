import React from 'react';

import WorkerRow from './WorkerRow';

import './WorkerPage.css';

export default function WorkerPage() {
  return (
    <div className='container'>
      <p className='header-5 primary-color bold'>Workers</p>
      <div className='spacer spacer-height-lg' />
      <div className='table-title worker-table-title'>
        <p className='header-6'>Name</p>
        <p className='header-6 text-center'>Wage</p>
        <p className='header-6 text-center'>Phone</p>
        <p className='header-6 text-center'>Date Joined</p>
        <p className='header-6 text-center'>Vehicle</p>
      </div>

      <WorkerRow key={1} />
    </div>
  )
}
