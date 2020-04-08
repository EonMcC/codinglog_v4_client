import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLanguages, removeLanguage } from "../store/actions/languages";
import LanguageItem from "../components/LanguageItem";
import "../styles/languages-style.css";

class LanguageList extends Component {
  componentDidMount() {
    this.props.fetchLanguages();
  }

  reloadLanguages = () => {
    this.props.fetchLanguages();
  };

  render() {
    const { languages, removeLanguage } = this.props;
    let languageList = languages.map(lang => (
      <LanguageItem
        key={lang._id}
        text={lang.text}
        totalTime={lang.totalTime}
        removeLanguage={removeLanguage.bind(this, lang.user, lang._id)}
        reloadLanguages={this.reloadLanguages}
      />
    ));
    return (
      <div>
        {this.props.languages.length < 1 && <p>No languages saved yet...</p>}
        <div className="languages-container">{languageList}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    languages: state.languages,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { fetchLanguages, removeLanguage })(
  LanguageList
);
