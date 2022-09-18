import React, { useState, useEffect } from 'react';

function AttendanceRow(props) {
  const [attended, setAttend] = useState(props.attendance ? true : false);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    if (props.allPresent && !attended) {
      setAttend(props.allPresent);
      setModified(true);
    }

  }, [props.allPresent, attended]);

  useEffect(() => {
    setAttend(props.attendance ? true : false);
    setModified(false);

  }, [props.attendance]);

  const attend = function () {
    if (attended)
      return;

    setModified(true);
    setAttend(!attended);
    props.onAttendanceUpdate({ [props.worker.id]: { vehicleId: props.worker.vehicle.id, date: props.date, present: true } });
  }

  const absent = function () {
    if (!attended)
      return;

    setAttend(!attended);
    setModified(true);

    props.onAttendanceUpdate({ [props.worker.id]: { vehicleId: props.worker.vehicle.id, date: props.date, present: false } });
  }

  const attendanceChecker = function () {
    if (attended && !modified) {
      return 'present';
    }

    if (attended && modified) {
      return 'present-modified';
    }

    if (!attended && !modified) {
      return 'absent';
    }

    if (!attended && modified) {
      return 'absent-modified';
    }
  }

  return (
    <tr>
      <td colSpan={2}>{props.worker.name}</td>
      <td>{props.worker.vehicle.registrationNum}</td>
      <td className={attendanceChecker()}>{attended ? 'Present' : 'Absent'}</td>
      <td>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => attend()} className='svg-icon clickable' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64">
          <rect x="0" y="0" width="64" height="64" fill="none" stroke="none" />
          <circle cx="32" cy="32" r="30" fill="#4bd37b" />
          <path fill="#fff" d="M46 14L25 35.6l-7-7.2l-7 7.2L25 50l28-28.8z" />
        </svg>
        <div className='spacer spacer-width-sm' />
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => absent()} className='svg-icon clickable' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64">
          <rect x="0" y="0" width="64" height="64" fill="none" stroke="none" />
          <circle fill="#ff5a79" cx="32" cy="32" r="30" />
          <path fill="#fff" d="M50 21.2L42.8 14L32 24.8L21.2 14L14 21.2L24.8 32L14 42.8l7.2 7.2L32 39.2L42.8 50l7.2-7.2L39.2 32z" /></svg>
      </td>
    </tr>
  )
}

export default AttendanceRow;
