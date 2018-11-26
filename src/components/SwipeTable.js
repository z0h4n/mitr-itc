import React from 'react';
import { Table } from 'react-bootstrap';

const ROW_ERROR_HIGHLIGHT = {
  backgroundColor: '#a94442',
  color: '#fff'
};

function TableData(props) {
  const swipeErrors = props.swipeErrors || [];
  return props.swipes.map((s, i) => {
    return (
      <tr key={i} style={swipeErrors.includes(i) ? ROW_ERROR_HIGHLIGHT : {}}>
        <td>{s['#']}</td>
        <td>{s.date.toLocaleString()}</td>
        <td>{s.inout}</td>
        <td>{s.door}</td>
      </tr>
    )
  });
}

export default function SwipeTable(props) {
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Swipe Time</th>
            <th>In/Out</th>
            <th>Door/Address</th>
          </tr>
        </thead>
        <tbody>
          <TableData swipes={props.swipes} swipeErrors={props.swipeErrors} />
        </tbody>
      </Table>
    </div>
  )
}