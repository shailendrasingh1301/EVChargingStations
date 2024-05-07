import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import {rootReducer} from './slices';
import {rootSaga} from './sagas';

const persistConfig = {
  key: 'root',
  debug: true,
  storage: AsyncStorage,
  // blacklist: [],
};

const middleware = [];

const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancers = [...middleware];

const config = {...enhancers};

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(enhancers),
});

const persistor = persistStore(store, config, () => {});

sagaMiddleware.run(rootSaga);

export {store, persistor};
