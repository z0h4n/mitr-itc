import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

// export default function SwipeInput(props) {
//   return (
//     <FormGroup controlId="formControlsTextarea">
//       <FormControl
//         componentClass="textarea"
//         placeholder="Paste your swipes from greythr here"
//         style={{ resize: 'none', height: '250px' }}
//         onChange={props.onInput} />
//     </FormGroup>
//   )
// }

export default class SwipeInput extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.state = { value: '' };
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({ value }, () => {
      this.props.onInput(value);
    });
  }

  onMessage(event) {
    if (event.data && event.data.type && event.data.type === 'attendanceData') {
      const { value } = event.data;
      this.setState({ value }, () => {
        this.onChange({ target: { value } })
      });
    }
  }

  componentDidMount() {
    if (window.opener) {
      window.addEventListener('message', this.onMessage);
      window.opener.postMessage({ component: 'SwipeInput', type: 'componentDidMount' }, '*');
    }
  }

  render() {
    return (
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          componentClass="textarea"
          placeholder="Paste your swipes from greythr here"
          style={{ resize: 'none', height: '250px' }}
          onChange={this.onChange}
          value={this.state.value} />
      </FormGroup>
    )
  }
}