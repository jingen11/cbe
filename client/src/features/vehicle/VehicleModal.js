import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {format} from 'date-fns';

import Modal from '../../components/Modal';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

import { addVehicle, editVehicle, removeVehicle } from '../../actions';

export default function VehicleModal(props) {
  const dateString = format( new Date(), 'yyyy-MM-dd');

  const dispatch = useDispatch();

  const [platNum, setPlatNum] = useState('');
  const [roadTaxExpDate, setRoadTaxExpDate] = useState(dateString);
  const [puspakomExpDate, setPuspakomExpDate] = useState(dateString);
  const [petrolCardNum, setPetrolCardNum] = useState('');
  const [touchNGoCardNum, setTouchNGoCardNum] = useState('');
  const [error, setError] = useState('');


  const initModal = function(){
    if(props.vehicleDetails !== null && props.mode === 1){
      setPlatNum(props.vehicleDetails.registrationNum);
      setRoadTaxExpDate(format( new Date(props.vehicleDetails.roadTaxExpDate), 'yyyy-MM-dd'));
      setPuspakomExpDate(format( new Date(props.vehicleDetails.puspakomExpDate), 'yyyy-MM-dd'));
      setPetrolCardNum(props.vehicleDetails.petrolCardNum);
      setTouchNGoCardNum(props.vehicleDetails.touchNGoCardNum);
    }
  }

  const platNumOnChange = function (e) {
    setPlatNum(e.target.value);
  }

  const roadTaxExpDateOnChange = function (e){
    setRoadTaxExpDate(e.target.value);
  }

  const puspakomExpDateOnChange = function (e){
    setPuspakomExpDate(e.target.value);
  }

  const petrolCardNumOnChange = function (e) {
    setPetrolCardNum(e.target.value);
  }

  const tounchNGoCardOnChange = function (e) {
    setTouchNGoCardNum(e.target.value);
  }


  const submitForm = function (e) {
    e.preventDefault();

    if (platNum.trim() === '') {
      setError('name cannot be empty');
      return;
    }
    
    else if (roadTaxExpDate.trim() === '') {
      setError('road tax expire date cannot be empty');
      return;
    }

    else if (puspakomExpDate.trim() === '') {
      setError('puspakom expire date cannot be empty');
      return;
    }

    else if (petrolCardNum.trim() === '') {
      setError('petrol card number cannot be empty');
      return;
    }

    else if (touchNGoCardNum.trim() === '') {
      setError('name cannot be empty');
      return;
    }

    setError('');

    if(props.mode === 0)
      dispatch(addVehicle({
        registrationNum: platNum,
        roadTaxExpDate,
        puspakomExpDate,
        petrolCardNum,
        touchNGoCardNum
      }));

    else
      dispatch(editVehicle({
        id: props.vehicleDetails.id,
        registrationNum: platNum,
        roadTaxExpDate,
        puspakomExpDate,
        petrolCardNum,
        touchNGoCardNum
      }));
    

    disposeModal();
  }

  const deleteWorker = function (e){
    e.preventDefault();

    dispatch(removeVehicle(props.vehicleDetails.id));

    disposeModal();
  }

  const disposeModal = function () {
    props.toggleModal(false);
    
    setPlatNum('');
    setRoadTaxExpDate(dateString);
    setPuspakomExpDate(dateString);
    setTouchNGoCardNum('');
    setPetrolCardNum('');
    setError('');
  }

  return (
    <Modal isOpen={props.isOpen} closeModal={disposeModal} parent={'#vehicle-page'} initModal={initModal}>
      <React.Fragment>
        <p className='header-5 primary-color bold'>
          {props.mode === 0 ?'New Vehicle': 'Edit Vehicle'}
        </p>
        <div className='spacer spacer-height-md' />
        <div className='grid grid-2-cols vehicle-form'>
          <TextField fieldName='platNum' label='Plat Number' value={platNum} placeholder='Plat number' textOnChanged={platNumOnChange} />
          <TextField fieldName='roadTaxExpDate' type='date' label='Road Tax Exp Date' value={roadTaxExpDate} placeholder='01/07/2022' textOnChanged={roadTaxExpDateOnChange} />
          <TextField fieldName='puspakomExpDate' type='date' label='Puspakom Exp Date' value={puspakomExpDate} placeholder='01/07/2022' textOnChanged={puspakomExpDateOnChange} />
          <TextField fieldName='petrolCardNum' label='Petrol Card Number' value={petrolCardNum} placeholder='1234567' textOnChanged={petrolCardNumOnChange} />
          <TextField fieldName='touchNGoCardNum' label='Touch N Go Card Number'value={touchNGoCardNum}  placeholder='1234567' textOnChanged={tounchNGoCardOnChange} />
          <div className='form-button flex flex-vertical'>
            <p className={`body-text-1 error-text ${error ? "error-text--active" : ""}`}>{error ? error : "error placeholder"}</p>
            <div className='spacer spacer-height-sm' />
            <Button className='submit-button' onClick={submitForm}>
              <p className="body-text-2 bold">
              {props.mode === 0 ?'Submit': 'Edit'}
              </p>
            </Button>
          </div>
          {props.mode === 1? <Button className="form-button error-button" onClick={deleteWorker}>
            <p className="body-text-2 bold">Delete</p>
            </Button>: null}
        </div>
      </React.Fragment>
    </Modal>
  )
}

VehicleModal.propTypes = {
  isOpen: PropTypes.bool,
  mode: PropTypes.number,
  toggleModal: PropTypes.func,
  vehicleDetails: PropTypes.object,
}
