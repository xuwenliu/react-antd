import { createStore, applyMiddleware,compose } from 'redux';
import rootReducers from '../reducers/reducer_common';
import createSagaMiddleware  from 'redux-saga';
import todoListSaga from '../sagas/todoListSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(
    rootReducers,
    enhancer
);

sagaMiddleware.run(todoListSaga);


export default store;