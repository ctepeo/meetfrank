import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classNames';
import { tryToSignIn } from '_app/actions/signin.actions';

import './SignIn.scss';

const SignIn = ({
  isSignInProcessing,
  userName,
  redirect,
  tryToSignIn,
}) => {
  const { t } = useTranslation();

  const [ state, setState ] = useState({
    userName: userName,
    isUserNameValid: false,
    redirect: redirect,
  });

  const buttonClassNames = classNames({
    disabled: !state.userName.length || isSignInProcessing,
  });

  const handleFormSubmit = (e) => {
    if (e) {
      const event = e;
      e.preventDefault();
    }
    tryToSignIn(state.userName);
  };

  function handleUsernameChange (e) {
    const newUserName = e.target.value;
    setState((prevState) => ({
      ...prevState,
      userName: newUserName,
    }));
  }

  if (redirect) {
    return (<Redirect to={redirect} />);
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mf-chat-sign-in">
      <h2>{t('signin.welcome')}</h2>
      <input
        type="text"
        placeholder={t('signin.username_placeholder')}
        value={state.userName}
        name="username"
        onChange={handleUsernameChange}
        disabled={isSignInProcessing}
      />
      <button
        type="submit"
        className={buttonClassNames}
        disabled={!state.userName.length || isSignInProcessing}
      >
        {isSignInProcessing ?
          t('signin.action_button_loading') : t(
            'signin.action_button')}

      </button>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSignInProcessing: state.signin.isSignInProcessing,
  userName: state.app.userName,
  redirect: state.signin.redirect,
});
const mapDispatchToProps = {
  tryToSignIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
