import React from 'react';
import { ProgressBar } from 'react-bootstrap';
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
  ],
  [
    {
      label: 'Full Day Compoff',
      time: DateClass.hrsToMsecs(6)
    }
  ]
];

const COMPLETED_MSG = 'Session Complete';
const TODAY = (new DateClass()).toDateString();

function ProgressText(props) {
  const { label, sessionTime, remainingTime, isLastOut } = props;

  const completesOn = new DateClass(DateClass.now() + remainingTime);
  const completesOnDate = completesOn.toDateString();
  const sessionComplete = remainingTime <= 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'calc(100%/3) calc(100%/3) calc(100%/3)', fontWeight: 'bold', marginBottom: '5px' }}>
      <div title="Session">
        {label} | {DateClass.msecsToHHMM(sessionTime)}
      </div>
      <div style={{ textAlign: 'center' }} title="Remaining">
        {
          remainingTime >= sessionTime
            ? ''
            : sessionComplete
              ? ''
              : DateClass.msecsToHHMMSS(remainingTime)
        }
      </div>
      <div style={{ textAlign: 'right' }} title="Completes On">
        {
          remainingTime >= sessionTime
            ? ''
            : sessionComplete
              ? COMPLETED_MSG
              : isLastOut
                ? ''
                : `${completesOnDate === TODAY ? '' : `${completesOnDate}, `}${completesOn.toLocaleTimeString()}`
        }
      </div>
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
              <ProgressText
                label={current_sessions[i].label}
                sessionTime={current_sessions[i].time}
                remainingTime={r}
                isLastOut={isLastOut} />
              <ProgressBar
                bsStyle={isComplete ? 'success' : 'warning'}
                max={current_sessions[i].time}
                now={isComplete ? current_sessions[i].time : current_sessions[i].time - r}
                striped={isComplete || isLastOut ? false : true}
                active={isComplete || isLastOut ? false : true} />
            </div>
          )
        })
      }
    </div>
  )
}