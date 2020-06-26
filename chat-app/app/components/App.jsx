import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faSpinner } from '@fortawesome/free-solid-svg-icons';
import i18n from '_app/utils/i18n';
import SignIn from './SignIn/SignIn';
import Userlist from './Userlist/Userlist';

import { setAppReady } from '_app/actions/app.actions';
import socket from '_models/socketio.model.jsx';
import Spinner from '_components/Spinner/Spinner';

import './App.scss';

library.add(fas, faSpinner);

const App = ({
  isAppReady,
  setAppReady,
}) => {
  // componentDidMount
  useEffect(() => {
    setAppReady(false)
      .then(async () => {
        // import i18n (needs to be bundled ;))
        return await i18n.init();
      })
      .then(async () => {
        return await socket.connect();
      })
      .then(() => {
        setAppReady(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ setAppReady ]);

  if (isAppReady) {
    return (
      <BrowserRouter>
        <Helmet>
          <title>Welcome to the chat</title>
          <meta charSet="utf-8" />
          <meta name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="Welcome to the chat" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/userlist" component={Userlist} />
        </Switch>
      </BrowserRouter>
    );
  }
  else {
    return (
      <Spinner />
    );
  }
};

const mapStateToProps = (state) => ({
  isAppReady: state.app.isAppReady,
});

const mapDispatchToProps = {
  setAppReady,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
