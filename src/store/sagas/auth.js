import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import { includes } from 'lodash'

import axios from '../../axios-mediprest'
import { authMessages } from '../httpmessages'
import * as actions from '../actions'

export function* logoutSaga(action) {
  // remove localstorage and data from auth state
  yield call([localStorage, 'removeItem'], 'token') // to make this testable
  yield call([localStorage, 'removeItem'], 'collaborator')
  yield call([localStorage, 'removeItem'], 'expirationDate')
  yield call([localStorage, 'removeItem'], 'activeInami')
  yield call([localStorage, 'removeItem'], 'currentPerformer')
  yield put(actions.resetConnectionAs())
  yield put(actions.authReset())
  yield put(actions.logoutSucceed()) // put to dispatch an action
}

export function* checkAuthTimeoutSaga(action) {
  // run logout when token has expired
  yield delay(action.expirationTime) // like a settimeout from saga
  yield put(actions.logout())
}

export function* authSaga(action) {
  // authentication
  yield put(actions.authStart())
  const authData = {
    username: action.payload.username,
    password: action.payload.password
  }

  try {
    // with saga dont use basic promis but initiate a const  surround by a try catch statement
    const response = yield axios.post('/auth/login', authData)

    const token = yield jwtDecode(response.headers['x-auth-token'])
    const expirationDate = yield new Date(token.exp * 1000) // timestamp * 1000 (js works in millisecondes)

    yield localStorage.setItem('token', response.headers['x-auth-token'])
    yield localStorage.setItem('expirationDate', expirationDate)
    yield localStorage.setItem(
      'collaborator',
      JSON.stringify(response.data.collaborator)
    )
    yield put(
      actions.authenticationSuccess(
        response.data.token,
        response.data.collaborator
      )
    )
    yield put(actions.checkRedirect())
    yield put(
      actions.checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
    )
  } catch (err) {
    // axios error from http request
    let error = authMessages.code_400
    if (err.message.includes('500')) {
      error = authMessages.code_500
    }
    yield put(actions.authenticationFail(error))
  }
}

export function* checkRedirectSaga(action) {
  // check where redirect after auth and set connectionAs if is a performer without delegation
  const collaborator = yield JSON.parse(localStorage.getItem('collaborator'))
  let redirectPath = '/'
  if (includes(collaborator.roles, 'Billing')) {
    redirectPath = '/facturation-validation'
  } else if (includes(collaborator.roles, 'Performer')) {
    if (includes(collaborator.roles, 'Delegate')) {
      redirectPath = '/connexion-en-tant-que'
    } else {
      redirectPath = '/validation'
      const { firstname, name, inami, _id } = collaborator
      yield put(actions.initSetChoice({ inami, _id, firstname, name }))
    }
  } else {
    redirectPath = '/connexion-en-tant-que'
  }
  yield put(actions.setAuthRedirectPath(redirectPath))
}

export function* checkStateSaga(action) {
  // for auto sign in
  const token = yield localStorage.getItem('token')
  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    )
    if (expirationDate <= new Date()) {
      yield put(actions.logout())
    } else {
      const collaborator = yield JSON.parse(
        localStorage.getItem('collaborator')
      )
      const performer = yield JSON.parse(
        localStorage.getItem('currentPerformer')
      )
      if (performer) {
        yield put(actions.initSetChoice(performer))
      }
      yield put(actions.authenticationSuccess(token, collaborator))
      yield put(
        actions.checkAuthTimeout(
          expirationDate.getTime() - new Date().getTime()
        )
      )
    }
  }
}
