import React, { Component } from "react";
import { connect } from "react-redux";
import { getTime, startTimer, addTimerTime } from "../store/actions/timer";
import "../styles/timer-style.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      interval: null,
      offset: null,
      isOn: false,
      pageRefreshed: false,
      formattedTime: "00:00",
      overlay: false,
    };
  }

  componentDidMount() {
    this.props
      .getTime()
      .then(({ startTime }) => {
        if (startTime === 0) {
          this.setState({ isOn: false });
        } else {
          this.setState({ time: Date.now() - startTime });
          return true;
        }
      })
      .then((res) => {
        if (res === true) {
          this.setState({ pageRefreshed: true });
          this.start();
        }
      });
  }

  update = () => {
    let stateTime = this.state.time;
    let delta = (stateTime += this.delta());
    this.setState({ time: delta });
    this.timeFormatter(delta);
  };

  delta = () => {
    let now = Date.now();
    let timePassed = now - this.state.offset;
    this.setState({ offset: now });
    return timePassed;
  };

  start = () => {
    if (!this.state.isOn) {
      let date = Date.now();
      this.setState({ interval: setInterval(this.update, 10) });
      this.setState({ offset: date });
      this.setState({ isOn: true });
      if (!this.state.pageRefreshed) {
        this.props.startTimer(date);
      }
    }
  };

  stop = () => {
    let { interval, isOn } = this.state;
    if (isOn) {
      this.setState({ overlay: true });
      clearInterval(interval);
      this.setState({ interval: null });
      this.setState({ isOn: false });
      this.props.getTime().then(({ startTime }) => {
        let timeDiff = Date.now() - startTime;
        this.props.addTimerTime(timeDiff);
        this.props.startTimer(0);
        this.setState({ pageRefreshed: false });
        this.setState({ overlay: false });
        this.props.history.push("/manual-list");
      });
    }
  };

  timeFormatter = (timeMs) => {
    let time = new Date(timeMs);
    let tzOffset = new Date().getTimezoneOffset() / 60;
    let hours = Number(time.getHours() + tzOffset).toString();
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();

    if (hours.length < 2) {
      hours = `0${hours}`;
    }
    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }
    if (seconds.length < 2) {
      seconds = `0${seconds}`;
    }
    this.setState({ formattedTime: `${hours}:${minutes}:${seconds}` });
  };

  // Not currently used
  // reset = () => {
  //   this.setState({time: 0});
  // }

  render() {
    return (
      <div className="timer">
        {this.state.overlay && (
          <div>
            <p>Please Wait</p>
            <div className="timer-overlay"></div>
          </div>
        )}
        {!this.state.isOn && this.state.overlay === false && (
          <button className="timer-btn-start" onClick={this.start}>
            Start Timer
          </button>
        )}
        {this.state.isOn && this.state.overlay === false && (
          <button className="timer-btn-stop" onClick={this.stop}>
            Stop Timer
            <br />
            <br />
            {this.state.formattedTime}
          </button>
        )}
        {/* <button onClick={this.reset}>Reset Timer</button>
        <h1>{this.state.time}</h1> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps, { getTime, startTimer, addTimerTime })(
  Timer
);
