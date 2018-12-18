import React from 'react';
import { Alert, Button } from 'react-bootstrap';


const Random = {
  range(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  bool() {
    return !!Math.round(Math.random());
  }
}

export default class Demo extends React.Component {
  constructor() {
    super();
    this.generateSwipes = this.generateSwipes.bind(this);
  }

  generateSwipes() {
    const startSwipe = new Date();
    startSwipe.setHours(startSwipe.getHours() - Random.range(1, 9));
    startSwipe.setMinutes(Random.range(0, 59));
    startSwipe.setSeconds(Random.range(0, 59));

    let input = `1\t${startSwipe.toString()}\tIn`;

    if (Random.bool()) {
      const outSwipe = new Date();
      outSwipe.setHours(startSwipe.getHours() + Random.range(3, 9));
      outSwipe.setMinutes(Random.range(0, 59));
      outSwipe.setSeconds(Random.range(0, 59));
      input += `\n1\t${outSwipe.toString()}\tOut`;
    }

    window.postMessage({ type: 'attendanceData', value: input });
  }

  render() {
    return (
      <Alert bsStyle="info" style={{ marginTop: '10px' }}>
        <strong>Demo Mode On</strong>
        <div>
          You are running this website in Demo Mode. Click <strong>Generate</strong> to generate random swipe data.
        </div>
        <Button bsStyle="primary" style={{ marginTop: '10px' }} onClick={this.generateSwipes}>
          Generate
        </Button>
      </Alert>
    )
  }
}