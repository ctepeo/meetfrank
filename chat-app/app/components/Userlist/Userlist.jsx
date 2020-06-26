import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import i18n from '_app/utils/i18n';
import { useTranslation } from 'react-i18next';
import classNames from 'classNames';
import { tryToSignIn } from '_app/actions/signin.actions';
import socket from '_models/socketio.model.jsx';

import './Userlist.scss';

const Userlist = ({
  isSignInProcessing,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mf-chat-userlist">
      <h2>{t('userlist.currently_online')}</h2>
      <div>
        <button type="button">
          James
          <div>{t('userlist.unread_badge')}
            <span>1</span>
          </div>
        </button>
        <button type="button">
          Peter
        </button>
        <button type="button">
          Peter
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isSignInProcessing: state.signin.isSignInProcessing,
  userName: state.app.userName,
});
const mapDispatchToProps = {
  tryToSignIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Userlist);
