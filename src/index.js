import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { MuiThemeProvider } from 'material-ui/styles'
import './index.css'
import App from './App'
import validationReducer from './store/reducers/validation'
import authReducer from './store/reducers/auth'
import connectionAsReducer from './store/reducers/connectionAs'
import prestationReducer from './store/reducers/prestations'
import historicReducer from './store/reducers/historic'
import billingReducer from './store/reducers/billing'
import messagesReducer from './store/reducers/messages'
import {
  watchAuth,
  watchConnectionAs,
  watchValidation,
  watchPrestations,
  watchHistoric,
  watchBilling,
  watchMessages
} from './store/sagas'

const rootReducer = combineReducers({
  validation: validationReducer,
  auth: authReducer,
  billing: billingReducer,
  connectionAs: connectionAsReducer,
  prestations: prestationReducer,
  historic: historicReducer,
  messages: messagesReducer
})
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchConnectionAs)
sagaMiddleware.run(watchValidation)
sagaMiddleware.run(watchPrestations)
sagaMiddleware.run(watchHistoric)
sagaMiddleware.run(watchBilling)
sagaMiddleware.run(watchMessages)

const app = (
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
