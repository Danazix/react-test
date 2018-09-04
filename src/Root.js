import React, { Component } from 'react';
import { Provider } from 'react-redux';
import storeConfig from './storeConfig';
import App from './containers/App';

const store = storeConfig(); // initialization of store

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
