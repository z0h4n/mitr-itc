import React from 'react';
import SevenSegmentDisplay from 'react-seven-segment-display';
import { DateClass } from '@Classes';

function Cirle(props) {
  return <div style={{ width: '10px', height: '10px', backgroundColor: props.color || 'red', borderRadius: '50%' }}></div>
}

function Colon(props) {
  return (
    <div style={{ display: 'inline-block' }}>
      <Cirle color={props.color} />
      <div style={{ height: '15px' }}></div>
      <Cirle color={props.color} />
    </div>
  )
}

export default function TimeDisplay(props) {
  const time = (new DateClass(props.time < 0 ? 0 : props.time)).toHHMMSS();
  return (
    <div style={{ display: 'table', margin: '30px auto' }}>
      <div style={{ display: 'table-row' }}>
        {
          time.split('').map((t, i) => {
            return (
              <div key={i} style={{ display: 'table-cell', padding: '0px 10px', verticalAlign: 'middle' }}>
                {t !== ':' ? <SevenSegmentDisplay key={i} value={t} onColor={props.color} height={10} /> : <Colon key={i} color={props.color} />}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}