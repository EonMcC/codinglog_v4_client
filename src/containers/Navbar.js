import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout, deleteAccount } from "../store/actions/auth";
import { patchTheme, getTheme } from "../store/actions/theme";
import { Link } from "react-router-dom";
import "../styles/navbar-style.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainColor: "",
      burgerVisable: false,
    };
  }

  componentDidMount = async () => {
    this.props.getTheme().then((res) => {
      this.setState({
        mainColor: res.theme,
      });
      this.setTheme();
    });
  };

  logout = (event) => {
    event.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };

  setTheme = () => {
    document.body.style.setProperty("--main", this.state.mainColor);
  };

  changeTheme = (event) => {
    let theme = event.target.value;
    document.body.style.setProperty("--main", theme);
    this.setState({ mainColor: theme });
    this.props.patchTheme(theme);
  };

  handleClickDelete = () => {
    let result = window.confirm(
      "Warning! Account deletion is permanent. Are you sure want to delete?"
    );
    if (result) {
      this.props.deleteAccount(this.props.currentUser.user.id);
      this.props.logout();
    }
  };

  handleBurger = () => {
    this.setState({ burgerVisable: !this.state.burgerVisable });
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/">Home</Link>
        </div>
        <Link to="/" className="header-link">
          Codinglog v.4
        </Link>
        <div>
          <h3 className="burger-img" onClick={this.handleBurger}>
            ☰
          </h3>
          {this.state.burgerVisable && (
            <div className="burger-menu">
              <div className="color-picker-container">
                <label htmlFor="color-picker">Theme:</label>
                <input
                  className="color-picker-box"
                  type="color"
                  name="color-picker"
                  value={this.state.mainColor}
                  onChange={this.changeTheme}
                ></input>
              </div>
              {this.props.currentUser.isAuthenticated && (
                <Link to="/" onClick={this.logout}>
                  Log Out
                </Link>
              )}
              {this.props.currentUser.isAuthenticated && (
                <a onClick={this.handleClickDelete}>Delete Account</a>
              )}
            </div>
          )}
        </div>
        {!this.props.currentUser.isAuthenticated && (
          <p>Sign in below to begin</p>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    theme: state.theme,
  };
}

export default withRouter(
  connect(mapStateToProps, { logout, deleteAccount, patchTheme, getTheme })(
    Navbar
  )
);
