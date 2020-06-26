import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classNames';
import { fetchChatHistory } from '_app/actions/chat.actions';

import './Chat.scss';

const Chat = ({
  fetchChatHistory,
  chatId,
  chatHistory,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mf-chat-chatbox">
      <div className="mf-chat-chatbox-navbar">
        <div>
          <button type="button">
            back
          </button>
        </div>
        <div>
          James
        </div>
        <div></div>
      </div>
      <div className="mf-chat-chatbox-messages">

        <div>
          <div>Hey Billy!</div>
        </div>
        <div>
          <div className="from-me">Hey James!</div>
        </div>

        <div>
          <div>Hey Billy!</div>
        </div>
      </div>
      <div className="mf-chat-chatbox-input">
        <input type="text" placeholder="your message" />
        <button type="submit">
          Send
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  chatId: state.chat.chatId,
  chatHistory: state.chat.chatHistory,
});
const mapDispatchToProps = {
  fetchChatHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
