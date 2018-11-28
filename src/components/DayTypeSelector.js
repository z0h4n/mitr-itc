import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export default function DayTypeSelector(props) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        Day Type
      </div>
      <ToggleButtonGroup defaultValue={0} type="radio" name="daytype" onChange={props.onDayTypeChange}>
        <ToggleButton value={0} style={{ color: document.body.style.color }}>Working</ToggleButton>
        <ToggleButton value={1} style={{ color: document.body.style.color }}>Non-Working</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}