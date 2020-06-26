import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '_utils/configureStore';

import App from '_components/App';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('mf-chat-app'),
);

if (module.hot)
  module.hot.accept();
