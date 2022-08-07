import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import WorkerRow from './WorkerRow';
import FloatingActionButton from '../../components/FloatingActionButton';
import EmptyPage from '../../components/EmptyPage';
import WorkerModal from './WorkerModal';

import { getWorkers } from '../../actions';

import './WorkerPage.css';

function WorkerPage(props) {
  const [isOpen, toggleModal] = useState(false);
  const [selectedWorker, setWorker] = useState(null);
  const [mode, setMode] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => { dispatch(getWorkers()) }, [dispatch]);

  const workerOnClick = function(worker){
    setWorker(worker);
    toggleModal(true);
    setMode(1);
  }

  return (
    <div className='worker-page' id='worker-page'>
      <div className='container'>
        {props.workers.workers.length > 0 ?
          (<React.Fragment>
            <p className='header-5 primary-color bold'>Workers</p>
            <div className='spacer spacer-height-lg' />
            <div className='table-title worker-table-title'>
              <p className='header-6 text-center'>Name</p>
              <p className='header-6 text-center'>Wage</p>
              <p className='header-6 text-center'>Phone</p>
              <p className='header-6 text-center'>Date Joined</p>
              <p className='header-6 text-center'>Vehicle</p>
            </div>
            {props.workers.workers.map((worker, index) => {
              return <WorkerRow key={index} worker={worker} workerOnClick={workerOnClick}/>
            })}
          </React.Fragment>) : <EmptyPage className="minus-padding" description={'No workers found...'} />}
      </div>
      <WorkerModal isOpen={isOpen} toggleModal={(isOpen) => toggleModal(isOpen)} workerDetails={selectedWorker? selectedWorker.toAux(): null} mode={mode}/>
      <FloatingActionButton onClick={()=> {toggleModal(true); setMode(0);} }>
        <svg xmlns="http://www.w3.org/2000/svg" className='svg-icon' aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
          <path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z" />
        </svg>
      </FloatingActionButton>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  workers: state.workers,
});

export default connect(mapStateToProps, null)(WorkerPage);
