import React from 'react';
import Application from './src/navigators/Application';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Application />
      </PersistGate>
    </Provider>
  );
};

export default App;
