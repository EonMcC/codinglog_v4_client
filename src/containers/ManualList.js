import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLanguages } from "../store/actions/languages";
import TimeInputForm from "../components/TimeInputForm";
import "../styles/time-list-style.css";

class ManualList extends Component {
  componentWillMount() {
    this.props.fetchLanguages();
  }

  render() {
    const { languages, timerTime, history } = this.props;
    let languagesList = languages.map(lang => (
      <TimeInputForm
        key={lang._id}
        text={lang.text}
        _id={lang._id}
        time={lang.totalTime}
        history={history}
      />
    ));
    let displayTime = null;
    if (timerTime > 0 && timerTime < 60000) {
      displayTime = <h1>Add less than a minute to...</h1>;
    } else if (timerTime >= 60000) {
      displayTime = <h1>Add {Math.floor(timerTime / 60000)} minutes to...</h1>;
    } else {
      displayTime = false;
    }
    return (
      <div className="manual-list">
        <div className="display-time-header">{displayTime}</div>
        <div className="time-list-container">{languagesList}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    languages: state.languages,
    currentUser: state.currentUser.user.id,
    timerTime: state.timerTime
  };
}

export default connect(mapStateToProps, { fetchLanguages })(ManualList);
