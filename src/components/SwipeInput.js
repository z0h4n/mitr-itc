import React from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

export default class SwipeInput extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.state = { value: '' };
  }

  onKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onKeyUp(event) {
    if (event.key === 'Tab') {
      let { value } = this.state;
      value += '\t';
      this.setState({ value }, () => {
        this.onChange({ target: { value } })
      });
      return false;
    }
    return true;
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
    const { swipeErrors } = this.props;

    return (
      <FormGroup
        controlId="formControlsTextarea"
        validationState={swipeErrors ? 'error' : null}>
        {swipeErrors ? <HelpBlock>{`${swipeErrors.length} Swipe Error${swipeErrors.length > 1 ? 's' : ''}`}</HelpBlock> : null}
        <FormControl
          componentClass="textarea"
          placeholder="Paste your swipes from greythr here"
          style={{ resize: 'none', height: '250px' }}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          value={this.state.value} />
      </FormGroup>
    )
  }
}