import React from 'react';
import { connect } from 'react-redux';

import AttendanceRow from './AttendanceRow';

function AttendanceTable(props) {
  const dateString = `${props.date.getFullYear()}_${props.date.getMonth() + 1}_${props.date.getDate()}`;
  const attendanceOfTheDay = props.attendances.attendances[dateString];

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Worker</th>
          <th>Vehicle</th>
          <th>Attendance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.workers.workers.map((worker, index) => {
          return (<AttendanceRow key={`${props.date}_${index}`}
            worker={worker}
            date={props.date}
            attendance={attendanceOfTheDay ? attendanceOfTheDay[worker.id] : null}
            allPresent={props.allPresent}
            onAttendanceUpdate={(attendance) => props.onAttendanceUpdate(attendance)} />)
        })}
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => ({
  workers: state.workers,
  attendances: state.attendances,
});

export default connect(mapStateToProps, null)(AttendanceTable);