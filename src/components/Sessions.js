import React from 'react';
import { ControlLabel, ProgressBar } from 'react-bootstrap';
import { DateClass } from '@Classes';

const sessions = [
  [
    {
      label: 'Half Day',
      time: DateClass.hrsToMsecs(4.5)
    },
    {
      label: 'Full Day',
      time: DateClass.hrsToMsecs(8.5)
    },
    {
      label: 'Full Day + Half Day Compoff',
      time: DateClass.hrsToMsecs(11.5)
    },
    {
      label: 'Full Day + Full Day Compoff',
      time: DateClass.hrsToMsecs(15.5)
    }
  ],
  [
    {
      label: 'Full Day Compoff',
      time: DateClass.hrsToMsecs(6)
    }
  ]
];

const COMPLETED_MSG = 'Complete';

function sessionLabel(remainingTime, isLastOut) {
  const completesOn = new DateClass(DateClass.now() + remainingTime);
  const sessionComplete = remainingTime <= 0;
  const style = {
    whiteSpace: 'nowrap',
    color: document.body.style.color,
    margin: '0px 10px'
  };

  return (
    <div style={style}>
      {
        sessionComplete
          ? COMPLETED_MSG
          : `${DateClass.msecsToHHMMSS(remainingTime)}${isLastOut
            ? ''
            : ` | ${completesOn.toLocaleString()}`}`
      }
    </div>
  );
}

export default function Sessions(props) {
  const { dayType, time, lastSwipe } = props;
  const current_sessions = sessions[dayType];
  const remaining = current_sessions.map(session => session.time - time);

  return (
    <div>
      {
        remaining.map((r, i) => {
          const isComplete = r <= 0;
          const isLastOut = lastSwipe && lastSwipe.inout === 'Out';

          return (
            <div key={i}>
              <ControlLabel>
                {current_sessions[i].label} | {DateClass.msecsToHHMM(current_sessions[i].time)}
              </ControlLabel>
              <ProgressBar
                bsStyle={isComplete ? 'success' : 'warning'}
                max={current_sessions[i].time}
                now={isComplete ? current_sessions[i].time : current_sessions[i].time - r}
                striped={isComplete || isLastOut ? false : true}
                active={isComplete || isLastOut ? false : true}
                label={r < current_sessions[i].time ? sessionLabel(r, isLastOut) : ''} />
            </div>
          )
        })
      }
    </div>
  )
}