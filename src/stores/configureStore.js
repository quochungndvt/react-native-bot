import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';
import { appCallApiMiddleware } from '../middleware/appCallApi';
//import { realtimeMessage, chatMiddleware } from '../utils/socket'

const logger = createLogger({
    predicate: (getState, action) => !action.type.endsWith('.CHANGE')
});


function configureStore(onComplete: ?() => void) {
  // const finalCreateStore (
  //     applyMiddleware(thunk, appCallApiMiddleware, logger)
  // )(createStore)
  const createHFStore = applyMiddleware(thunk, appCallApiMiddleware, logger)(createStore);
  const store = autoRehydrate()(createHFStore)(rootReducer);
	persistStore(store, { storage: AsyncStorage }, onComplete);
  return store;
}

export default configureStore;
