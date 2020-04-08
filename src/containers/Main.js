import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import { authUser } from "../store/actions/auth";
import AuthForm from "../components/AuthForm";
import { removeError } from "../store/actions/errors";
import LanguageForm from "./LanguageForm";
import LanguagesList from "./LanguagesList";
import ManualList from "./ManualList";

const Main = props => {
  const { authUser, currentUser, errors, removeError, history } = props;
  return (
    <div className="main-css">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Homepage currentUser={currentUser} history={history} />
          )}
        />
        <Route
          exact
          path="/manual-list"
          render={() => {
            return <ManualList currentUser={currentUser} history={history} />;
          }}
        />
        <Route
          exact
          path="/languageform"
          render={() => {
            return <LanguageForm currentUser={currentUser} history={history} />;
          }}
        />
        <Route
          exact
          path="/languages"
          render={() => {
            return (
              <LanguagesList currentUser={currentUser} history={history} />
            );
          }}
        />
        <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                onAuth={authUser}
                errors={errors}
                buttonText="Sign In"
                heading="Please Sign In"
                signIn
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                onAuth={authUser}
                errors={errors}
                buttonText="Sign Up"
                heading="Please Sign Up"
                signUp
                {...props}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(mapStateToProps, { authUser, removeError })(Main)
);
