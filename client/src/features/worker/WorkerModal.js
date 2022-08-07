import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {format} from 'date-fns';

import Modal from '../../components/Modal';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

import { addWorker, editWorker, removeWorker } from '../../actions';

export default function WorkerModal(props) {
  const dateString = format( new Date(), 'yyyy-MM-dd');

  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [icNo, setIcNo] = useState('');
  const [wage, setWage] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [dateJoined, setDateJoined] = useState(dateString);
  const [vehicle, setVehicle] = useState('');
  const [error, setError] = useState('');


  const initModal = function(){
    if(props.workerDetails !== null && props.mode === 1){
      setImageUrl(`/workers/${props.workerDetails.icImagePath}`);
      setImageFile(null);
      setName(props.workerDetails.name);
      setIcNo(props.workerDetails.icNo);
      setWage(props.workerDetails.wage);
      setPhone(props.workerDetails.phoneNumber);
      setDateJoined(format( new Date(props.workerDetails.dateJoined), 'yyyy-MM-dd'));
      setVehicle(props.workerDetails.vehicle?props.workerDetails.vehicle:'' );
    }
  }

  const nameOnChange = function (e) {
    setName(e.target.value);
  }

  const icNoOnChange = function (e) {
    setIcNo(e.target.value);
  }

  const wageOnChange = function (e) {
    setWage(e.target.value);
  }

  const phoneOnChange = function (e) {
    setPhone(e.target.value);
  }

  const dateJoinedOnChange = function (e) {
    setDateJoined(e.target.value);
  }

  const vehicleOnChange = function (e) {
    setVehicle(e.target.value);
  }

  const openFileSelector = function () {
    document.getElementById('worker_ic').click();
  };

  const imageOnSelected = function (e) {
    if (e.target.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = function (eve) {
        setImageUrl(eve.target.result);
        setImageFile(e.target.files[0]);

      };
    } else {
      setImageUrl('');
      setImageFile(null);
    }
  }

  const submitForm = function (e) {
    e.preventDefault();

    if (name.trim() === '') {
      setError('name cannot be empty');
      return;
    }
    else if (icNo.trim() === '') {
      setError('ic number cannot be empty');
      return;
    }

    else if (wage.trim() === '') {
      setError('wage cannot be empty');
      return;
    }

    else if (dateJoined.trim() === '') {
      setError('date joined cannot be empty');
      return;
    }

    else if (vehicle.trim() === '') {
      setError('vehicle cannot be empty');
      return;
    }

    setError('');

    if (imageFile) {
      let data = new FormData();
      data.append("icImage", imageFile);
      data.append("name", name);
      data.append("icNo", icNo);
      data.append("wage", wage);
      data.append("phoneNumber", phoneNumber);
      data.append("dateJoined", dateJoined);
      data.append("vehicle", vehicle);
    
      if(props.mode === 0)
        dispatch(addWorker(data));

      else
      {
        data.append("id", props.workerDetails.id);
        dispatch(editWorker(data));
      }
    } else {
      if(props.mode === 0)
        dispatch(addWorker({
          name,
          icNo,
          wage,
          phoneNumber,
          dateJoined,
          vehicle,
        }));

      else
        dispatch(editWorker({
          id: props.workerDetails.id,
          name,
          icNo,
          wage,
          phoneNumber,
          dateJoined,
          vehicle,
        }));
    }

    disposeModal();
  }

  const deleteWorker = function (e){
    e.preventDefault();

    dispatch(removeWorker(props.workerDetails.id));

    disposeModal();
  }

  const disposeModal = function () {
    props.toggleModal(false);
    setImageUrl('');
    setImageFile(null);
    setName('');
    setIcNo('');
    setWage('');
    setPhone('');
    setDateJoined(dateString);
    setVehicle('');
    setError('');
  }

  return (
    <Modal isOpen={props.isOpen} closeModal={disposeModal} parent={'#worker-page'} initModal={initModal}>
      <React.Fragment>
        <p className='header-5 primary-color bold'>
          {props.mode === 0 ?'New Worker': 'Edit Worker'}
        </p>
        <div className='spacer spacer-height-md' />
        <div className='grid grid-2-cols worker-form'>
          <div className='image-placeholder worker-image-placeholder clickable' onClick={openFileSelector}>
            <input type='file' id='worker_ic' name='workerIc' accept="image/*" onChange={imageOnSelected} hidden />
            {imageUrl ? (
              <img
                className="worker-image"
                src={imageUrl}
                alt="profile-pic"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className='svg-icon svg-icon--black' aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="currentColor" d="M20 20H4a1.943 1.943 0 0 1-2-1.876V5.875A1.942 1.942 0 0 1 4 4h16a1.942 1.942 0 0 1 2 1.875v12.25A1.943 1.943 0 0 1 20 20ZM4 6v11.989L20 18V6.011L4 6Zm9.43 10H6a3.21 3.21 0 0 1 1.093-2.14a3.829 3.829 0 0 1 2.622-1.11c.984.02 1.923.417 2.622 1.11A3.212 3.212 0 0 1 13.43 16ZM18 15h-3v-2h3v2Zm-8.285-3a1.934 1.934 0 0 1-2-2a1.935 1.935 0 0 1 2-2a1.935 1.935 0 0 1 2 2a1.934 1.934 0 0 1-2 2ZM18 11h-4V9h4v2Z" />
              </svg>
            )}

          </div>
          <TextField fieldName='name' label='Name' value={name} placeholder='Worker name' textOnChanged={nameOnChange} />
          <TextField fieldName='ic' label='Ic No.' value={icNo} placeholder='960410-07-5565' textOnChanged={icNoOnChange} />
          <TextField fieldName='wage' label='Wage' value={wage} placeholder='70' textOnChanged={wageOnChange} />
          <TextField fieldName='phoneNumber' label='Phone No.'value={phoneNumber}  placeholder='012-5138019' textOnChanged={phoneOnChange} />
          <TextField fieldName='dateJoined' type='date' value={dateJoined} label='Date Joined' placeholder='10/04/1996' textOnChanged={dateJoinedOnChange} />
          <Dropdown fieldName='vehicle' label='Vehicle'/>
          <TextField fieldName='vehicle' label='Vehicle' value={vehicle} placeholder='PLV6874' textOnChanged={vehicleOnChange} />
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

WorkerModal.propTypes = {
  isOpen: PropTypes.bool,
  mode: PropTypes.number,
  toggleModal: PropTypes.func,
  workerDetails: PropTypes.object,
}
