import React, { Component } from "react";
import "../styles/auth-form-style.css";
import { getTheme } from "../store/actions/theme";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      startTime: 0,
      theme: "#2F88A9"
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const authType = this.props.signIn ? "signin" : "signup";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        this.props.history.push("/");
      })
      .then(() => {
        this.props.getTheme().then(res => {
          document.body.style.setProperty("--main", res.theme);
        });
      })
      .catch(() => {
        return;
      });
  };

  render() {
    const { buttonText, heading, errors, removeError, history } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div className="auth-form-container">
        <h2>{heading}</h2>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          {errors.message && <div>{errors.message}</div>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">{buttonText}</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme
  };
}

export default withRouter(connect(mapStateToProps, { getTheme })(AuthForm));
