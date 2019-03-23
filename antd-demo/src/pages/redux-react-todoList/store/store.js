import { createStore,applyMiddleware, compose } from 'redux';
import rootReducers from '../reducers/reducer_common';


// const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware());



const store = createStore(rootReducers,enhancer);

export default store;