import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewLanguage } from "../store/actions/languages";
import "../styles/language-form-style.css";

class LanguageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      totalTime: 0
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let timeMs = this.state.totalTime * 60000;
    this.props.postNewLanguage(this.state.language, timeMs);
    this.setState({ language: "", totalTime: 0 });
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="language-form-container">
        <form className="language-form" onSubmit={this.handleSubmit}>
          <h2>Add a new Language</h2>
          <div>
            <label htmlFor="language">Language:</label>
            <input
              type="text"
              id="language"
              name="language"
              onChange={this.handleChange}
              value={this.state.language}
            />
          </div>
          <div>
            <label htmlFor="time">Time:</label>
            <input
              type="number"
              id="totalTime"
              name="totalTime"
              onChange={this.handleChange}
              value={this.state.totalTime}
            />
          </div>
          <button type="submit">Add this Language</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewLanguage })(LanguageForm);
