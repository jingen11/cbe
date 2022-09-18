import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import VehicleRow from './VehicleRow';
import FloatingActionButton from '../../components/FloatingActionButton';
import EmptyPage from '../../components/EmptyPage';
import VehicleModal from './VehicleModal';

import { getVehicles } from '../../actions';

import './VehiclePage.css';

function VehiclePage(props) {
  const [isOpen, toggleModal] = useState(false);
  const [selectedVehicle, setVehicle] = useState(null);
  const [mode, setMode] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => { dispatch(getVehicles()) }, [dispatch]);

  const vehicleOnClick = function (vehicle) {
    setVehicle(vehicle);
    toggleModal(true);
    setMode(1);
  }

  return (
    <div className='vehicle-page' id='vehicle-page'>
      <div className='container'>
        {props.vehicles.vehicles.length > 0 ?
          (<React.Fragment>
            <p className='header-5 primary-color bold'>Vehicles</p>
            <div className='spacer spacer-height-lg' />
            <div className='table-title vehicle-table-title'>
              <p className='header-6 text-center'>Plat Number</p>
              <p className='header-6 text-center'>Road Tax Exp Date</p>
              <p className='header-6 text-center'>Puspakom Exp Date</p>
              <p className='header-6 text-center'>Petrol Card Number</p>
              <p className='header-6 text-center'>TouchNGo Card Number</p>
            </div>
            {props.vehicles.vehicles.map((vehicle, index) => {
              return <VehicleRow key={index} vehicle={vehicle} vehicleOnClick={vehicleOnClick} />
            })}
          </React.Fragment>) : <EmptyPage className="minus-padding" description={'No vehicles found...'} />}
      </div>
      <VehicleModal isOpen={isOpen} toggleModal={(isOpen) => toggleModal(isOpen)} vehicleDetails={selectedVehicle ? selectedVehicle.toAux() : null} mode={mode} />
      <FloatingActionButton onClick={() => { toggleModal(true); setMode(0); }}>
        <svg xmlns="http://www.w3.org/2000/svg" className='svg-icon svg-icon--white' aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
          <path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75Z" />
        </svg>
      </FloatingActionButton>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  vehicles: state.vehicles,
});

export default connect(mapStateToProps, null)(VehiclePage);
