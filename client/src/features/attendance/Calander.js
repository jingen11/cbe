import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addDays, subDays, isAfter, startOfDay, endOfToday } from 'date-fns';

import { getAttendances } from '../../actions';

import DateCard from './DateCard';
import IconButton from '../../components/IconButton';

function Calander(props) {
  const dispatch = useDispatch();

  const [week, setWeek] = useState([
    subDays(new Date(), 3),
    subDays(new Date(), 2),
    subDays(new Date(), 1),
    startOfDay(new Date()),
    addDays(new Date(), 1),
    addDays(new Date(), 2),
    addDays(new Date(), 3)
  ]);

  const [currentDayIndex, setDayIndex] = useState(3);

  useEffect(() => {
    props.onDateChanged(week[currentDayIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week, currentDayIndex]);


  const decreaseDay = function () {
    if (currentDayIndex === 0) {

      if (props.workers.workers.length > 0)
        dispatch(
          getAttendances(
            { from: subDays(week[0], 7), to: subDays(week[0], 1) },
            [...props.workers.workers.map((worker) => worker.id)]
          )
        );

      setWeek([
        subDays(week[0], 7),
        subDays(week[0], 6),
        subDays(week[0], 5),
        subDays(week[0], 4),
        subDays(week[0], 3),
        subDays(week[0], 2),
        subDays(week[0], 1),
      ]);

      setDayIndex(6);

      return;
    }

    setDayIndex(currentDayIndex - 1);
  }

  const useIncreaseDay = function () {
    if (isAfter(week[currentDayIndex], subDays(new Date(), 1))) {
      return;
    }

    if (currentDayIndex === 6) {
      if (props.workers.workers.length > 0)
        dispatch(
          getAttendances(
            { from: startOfDay(addDays(week[6], 1)), to: isAfter(addDays(week[6], 7), endOfToday()) ? endOfToday() : addDays(week[6], 7) },
            [...props.workers.workers.map((worker) => worker.id)]
          )
        );

      setWeek([
        addDays(week[6], 1),
        addDays(week[6], 2),
        addDays(week[6], 3),
        addDays(week[6], 4),
        addDays(week[6], 5),
        addDays(week[6], 6),
        addDays(week[6], 7),
      ]);

      setDayIndex(0);

      return;
    }

    setDayIndex(currentDayIndex + 1);

  }

  const onClickCard = function (index) {
    setDayIndex(index);
  }

  return (
    <div className='grid calander-grid'>
      <IconButton className="icon-button--clear" onClick={decreaseDay} >
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon--black" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
          <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="none" />
          <path fill="currentColor" d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0z" />
        </svg>
      </IconButton >
      <div className='grid grid-7-cols date-card-grid'>
        {week.map((date, index) => {
          return <DateCard date={date} key={index} isSelected={index === currentDayIndex} onClick={() => onClickCard(index)} />
        })}
      </div>
      <IconButton className="icon-button--clear" onClick={useIncreaseDay}>
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon--black" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
          <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="none" />
          <path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512L340.864 831.872a30.592 30.592 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" />
        </svg>
      </IconButton>
    </div>
  )
}

const mapStateToProps = (state) => ({
  workers: state.workers
});

export default connect(mapStateToProps, null)(Calander);
