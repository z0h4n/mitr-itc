import React from 'react';
import { SwipeInput, SwipeTable, TimeDisplay, Sessions, DayTypeSelector, Errors } from '@Components';
import { SwipeClass, DateClass } from '@Classes';

export default class App extends React.Component {
  constructor() {
    super();
    this.onInput = this.onInput.bind(this);
    this.onDayTypeChange = this.onDayTypeChange.bind(this);
    this.tick = this.tick.bind(this);
    this.state = { swipes: new SwipeClass(), timeTillLastOut: 0, timeAfterLastIn: 0, dayType: 0, swipeErrors: null };
  }

  onInput(value) {
    const swipes = SwipeClass.generateFromString(value);
    const timeTillLastOut = swipes.getTimeTillLastOut();
    const swipeErrors = swipes.validate();
    this.setState({ swipes, timeTillLastOut, swipeErrors }, this.tick);
  }

  onDayTypeChange(event) {
    this.setState({
      dayType: event
    });
  }

  tick() {
    const lastSwipe = this.state.swipes.last();
    this.setState({
      timeAfterLastIn: lastSwipe && lastSwipe.inout === 'In'
        ? DateClass.now() - lastSwipe.date.getTime() : 0
    });
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
  }

  render() {
    const { swipes, timeTillLastOut, timeAfterLastIn, dayType } = this.state;

    return (
      <div className="container">
        {this.state.swipeErrors ? <Errors count={this.state.swipeErrors.length} /> : null}
        <TimeDisplay time={timeTillLastOut + timeAfterLastIn} color={document.body.style.color} />
        <DayTypeSelector onDayTypeChange={this.onDayTypeChange} />
        <Sessions time={timeTillLastOut + timeAfterLastIn} dayType={dayType} lastSwipe={swipes.last()} />
        <SwipeInput onInput={this.onInput} />
        {swipes.length ? <SwipeTable swipes={swipes} /> : null}
      </div>
    )
  }
}