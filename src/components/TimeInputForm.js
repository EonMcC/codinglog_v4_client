import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLanguageTime, fetchLanguages } from "../store/actions/languages";
import { addTimerTime } from "../store/actions/timer";

class TimeInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "",
    };
  }

  componentWillUnmount() {
    this.props.addTimerTime(0);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: Number(event.target.value),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.value !== 0) {
      let combinedTime = 0;
      if (event.target.name === "time") {
        combinedTime = this.props.time + this.state.time * 60000;
      } else if (event.target.name === "timer-time") {
        combinedTime = this.props.time + this.props.timerTime;
      } else {
        combinedTime = Number(this.props.time + 1500000);
      }
      this.props
        .updateLanguageTime(this.props._id, combinedTime)
        .then(this.props.fetchLanguages())
        .then(this.setState({ time: "" }))
        .then(this.props.history.push("/languages"));
    } else {
      return;
    }
  };

  render() {
    const { text, timerTime } = this.props;
    return (
      <div>
        {!timerTime && (
          <div className="time-list-box">
            <form
              className="time-form"
              onSubmit={this.handleSubmit}
              name="time"
            >
              <div>
                <label htmlFor="time">{text}</label>
                <input
                  type="number"
                  name="time"
                  value={this.state.time}
                  onChange={this.handleChange}
                  id="time"
                  placeholder="Enter minutes"
                />
              </div>
              <button type="submit">Submit Time</button>
            </form>
            <p>or</p>
            <form onSubmit={this.handleSubmit} name="pomodoro">
              <button type="submit">Quick Add: 25min</button>
            </form>
          </div>
        )}
        {timerTime > 0 && (
          <div className="time-list-box">
            <form
              className="time-form"
              onSubmit={this.handleSubmit}
              name="timer-time"
            >
              <div>
                <label htmlFor="timer-time">{text}</label>
                <input
                  type="hidden"
                  name="timer-time"
                  value={this.props.timerTime}
                  id="timer-time"
                />
              </div>
              <button type="submit">Submit Time</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    timerTime: state.timerTime,
  };
}

export default connect(mapStateToProps, {
  updateLanguageTime,
  fetchLanguages,
  addTimerTime,
})(TimeInputForm);
