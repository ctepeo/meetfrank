import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import i18n from '_app/utils/i18n';
import { useTranslation } from 'react-i18next';
import classNames from 'classNames';
import { tryToSignIn } from '_app/actions/signin.actions';
import socket from '_models/socketio.model.jsx';

import './Userlist.scss';
import { Redirect } from 'react-router-dom';

const Userlist = ({
  token,
  usersOnline,
}) => {
  useEffect(() => {
    if (!usersOnline) {
      socket.fetchUsersOnline();
    }
  }, [ token, usersOnline ]);
  const { t } = useTranslation();

  if (!token) {
    return (<Redirect to="/" />);
  }

  if (!usersOnline || !usersOnline.length) {
    return (<div className="mf-chat-userlist">
      <h2>{t('userlist.currently_online_empty')}</h2>
    </div>);
  }

  const users = [];
  for (let i in usersOnline) {
    const user = usersOnline[i];
    let unseenBadge = null;
    if (user.UNSEEN) {
      unseenBadge = <div>
        {t('userlist.unread_badge')}
        <span>{user.UNSEEN}</span>
      </div>;
    }
    users.push(
      <button type="button" key={user.USER_ID}>
        {user.USER_LOGIN}
        {unseenBadge}
      </button>,
    );
  }

  return (
    <div className="mf-chat-userlist">
      <h2>{t('userlist.currently_online')}</h2>
      <div>
        {users}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.app.token,
  usersOnline: state.chat.usersOnline,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Userlist);
