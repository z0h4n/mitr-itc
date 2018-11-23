import React from 'react';
import { Alert } from 'react-bootstrap';

export default function Errors(props) {
  return (
    <Alert bsStyle="danger" style={{ marginTop: '20px' }}>
      <p>
        {`${props.count} swipe error${props.count > 1 ? 's' : ''}`}
      </p>
    </Alert>
  )
}