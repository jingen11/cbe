import React from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { logOut } from '../../actions';
import IconButton from '../../components/IconButton';

export default function Drawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _logOut = function () {
    dispatch(logOut());
  }

  const toHome = function () {
    navigate("/");
  }

  const toWorker = function () {
    navigate("/workers");
  }

  const toVehicle = function () {
    navigate("/vehicles");
  }


  return (
    <div className='drawer'>
      <div className='drawer-icons'>
        <IconButton onClick={toHome}>
          <svg xmlns="http://www.w3.org/2000/svg" className='drawer-svg' aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 20v-7.826a4 4 0 0 0-1.253-2.908l-7.373-6.968a2 2 0 0 0-2.748 0L3.253 9.266A4 4 0 0 0 2 12.174V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
          </svg>
        </IconButton>
      </div>
      <div className="spacer spacer-height-sm" />
      <div className='drawer-icons'>
        <IconButton onClick={toWorker}>
          <svg xmlns="http://www.w3.org/2000/svg" className='drawer-svg' aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><rect x="0" y="0" width="32" height="32" fill="none" stroke="none" />
            <path fill="currentColor" d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5Zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3Z" /><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2Zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0Zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0Z" />
          </svg>
        </IconButton>
      </div>
      <div className="spacer spacer-height-sm" />
      <div className='drawer-icons'>
        <IconButton onClick={toVehicle}>
          <svg xmlns="http://www.w3.org/2000/svg" className='drawer-svg' aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
            <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
            <path fill="currentColor" d="M2 3.75C2 2.784 2.784 2 3.75 2h5.5c.967 0 1.75.784 1.75 1.75V4h.382a1.5 1.5 0 0 1 1.342.83l1.118 2.235a1.5 1.5 0 0 1 .158.671V11a1.5 1.5 0 0 1-1.5 1.5h-.563a2 2 0 0 1-3.874 0H6.937a2 2 0 0 1-3.907-.155A1.75 1.75 0 0 1 2 10.75v-7Zm6.063 7.75A2 2 0 0 1 10 10V3.75A.75.75 0 0 0 9.25 3h-5.5a.75.75 0 0 0-.75.75v7c0 .175.06.336.16.464a2 2 0 0 1 3.777.286h1.126ZM11 10.268a2 2 0 0 1 .937 1.232h.563a.5.5 0 0 0 .5-.5V8h-2v2.268ZM11 7h1.691l-.862-1.724A.5.5 0 0 0 11.382 5H11v2Zm-6 4a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm4 1a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z" />
          </svg>
        </IconButton>
      </div>
      <div className="spacer spacer-height-sm" />
      <div className='drawer-icons' />
      <div className='drawer-icons'>
        <IconButton onClick={_logOut}>
          <svg xmlns="http://www.w3.org/2000/svg" className='drawer-svg' aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 12h9m0 0l-3.333-4M22 12l-3.333 4M14 7V5.174a2 2 0 0 0-2.166-1.993l-8 .666A2 2 0 0 0 2 5.84v12.32a2 2 0 0 0 1.834 1.993l8 .667A2 2 0 0 0 14 18.826V17" />
          </svg>
        </IconButton>
      </div>

    </div>
  )
}
