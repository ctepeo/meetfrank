import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classNames';
import socket from '_models/socketio.model.jsx';
import { setChatLoading } from '_app/actions/chat.actions';

import './Chat.scss';
import Spinner from '../Spinner/Spinner';

const Chat = ({
  setChatLoading,
  isChatLoading,
  chatId,
  chatTargetUserName,
  chatHistory,
  props,
  token,
}) => {
  const history = useHistory();
  if (!token) {
    return (<Redirect to="/" />);
  }
  const [ state, setState ] = useState({
    message: '',
  });
  const newChatId = props.match.params.chatId;
  useEffect(() => {
    if (chatId != newChatId) {
      chatId = newChatId;
      setChatLoading(true);

      socket.fetchChatHistory(chatId);
    }
  }, [ newChatId, chatId, setChatLoading ]);
  const { t } = useTranslation();

  if (isChatLoading) {
    return (
      <div className="mf-chat-chatbox">
        <div className="mf-chat-chatbox-navbar">
          <div>
            <button type="button" onClick={() => history.push(`/userlist`)}>
              {t('chat.go_back')}
            </button>
          </div>
          <div>
            {chatTargetUserName}
          </div>
          <div></div>
        </div>
        <Spinner />
      </div>
    );
  }
  else {
    const messages = [];
    for (let i in chatHistory) {
      const msg = chatHistory[i];
      messages.push(
        <div key={msg.MESSAGE_ID}>
          <div className={msg.TO_USER_ID == newChatId
            ? 'from-me'
            : ''}>
            {msg.MESSAGE_TEXT}
          </div>
        </div>,
      );
    }

    function handleMessageChange (e) {
      const message = e.target.value;
      setState((prevState) => ({
        ...prevState,
        message: message,
      }));
    }

    const handleFormSubmit = (e) => {
      if (e) {
        const event = e;
        e.preventDefault();
      }
      socket.sendChatMessage(state.message, newChatId);
      setState((prevState) => ({
        ...prevState,
        message: '',
      }));
    };

    return (
      <div className="mf-chat-chatbox">
        <div className="mf-chat-chatbox-navbar">
          <div>
            <button type="button" onClick={() => history.push(`/userlist`)}>
              {t('chat.go_back')}
            </button>
          </div>
          <div>
            {chatTargetUserName}
          </div>
          <div />
        </div>
        <div className="mf-chat-chatbox-messages">
          {messages}
        </div>
        <div className="mf-chat-chatbox-input">
          <form onSubmit={handleFormSubmit}>
            <input
              onChange={handleMessageChange}
              type="text"
              value={state.message}
              placeholder={t('chat.message_placeholder')}
            />
            <button type="submit">
              {t('chat.send_button')}
            </button>
          </form>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  isChatLoading: state.chat.isChatLoading,
  chatId: state.chat.chatId,
  chatTargetUserName: state.chat.chatTargetUserName,
  chatHistory: state.chat.chatHistory,
  props: ownProps,
  token: state.app.token,
});
const mapDispatchToProps = {
  setChatLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
