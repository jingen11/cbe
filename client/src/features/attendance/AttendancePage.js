import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { subDays, startOfDay, endOfToday } from 'date-fns';

import Calander from './Calander';
import AttendanceTable from './AttendanceTable';
import EmptyPage from '../../components/EmptyPage';
import Button from '../../components/Button'

import { getAttendances, addAttendances } from '../../actions';

import './AttendancePage.css';

function AttendancePage(props) {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [allPresent, setAllPresent] = useState(false);
  const [attendances, setAttendances] = useState({});

  useEffect(() => {
    if (props.workers.workers.length > 0)
      dispatch(
        getAttendances(
          { from: startOfDay(subDays(new Date(), 3)), to: endOfToday() },
          [...props.workers.workers.map((worker) => worker.id)]
        )
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDateChanged = function (date) {
    setCurrentDate(date);
    setAllPresent(false);
    setAttendances({});
  }

  const selectAll = function () {
    setAllPresent(true);

    const attendanceObj = {};

    for (const worker of props.workers.workers) {
      attendanceObj[worker.id] = {
        date: currentDate,
        vehicleId: worker.vehicle.id,
        present: true
      }
    }

    setAttendances(attendanceObj);
  }

  const onAttendanceUpdate = function (attendanceObj) {
    setAllPresent(false);

    const tempAttendances = { ...attendances };

    tempAttendances[Object.keys(attendanceObj)[0]] = Object.values(attendanceObj)[0];

    setAttendances(tempAttendances);
  }

  const _addAttendances = function () {
    if (Object.keys(attendances).length === 0) {
      return;
    }

    dispatch(addAttendances(attendances));
  }

  return (
    <div className='worker-page' id='worker-page'>
      <div className='container'>
        {props.workers.workers.length > 0 ?
          (<React.Fragment>
            <p className='header-5 primary-color bold'>Attendance</p>
            <div className='spacer spacer-height-lg' />
            <Calander onDateChanged={(date) => onDateChanged(date)} />
            <div className='spacer spacer-height-lg' />
            <AttendanceTable date={currentDate} allPresent={allPresent} onAttendanceUpdate={onAttendanceUpdate} />
            <div className='flex action-row'>
              <div className='flex actions'>
                <Button className="success-button" onClick={() => selectAll()} >
                  <p className="body-text-2 bold">All Present</p>
                </Button >
                <Button >
                  <p className="body-text-2 bold" onClick={() => _addAttendances()}>Submit</p>
                </Button >
              </div>
            </div>
          </React.Fragment>) : <EmptyPage className="minus-padding" description={'Please add worker to use attendance...'} />}
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  workers: state.workers,
});

export default connect(mapStateToProps, null)(AttendancePage);
