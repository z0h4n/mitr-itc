import React from 'react';
import { Table } from 'react-bootstrap';

function TableData(props) {
  return props.swipes.map((s, i) => {
    return (
      <tr key={i}>
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
          <TableData swipes={props.swipes} />
        </tbody>
      </Table>
    </div>
  )
}