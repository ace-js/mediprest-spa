import * as actions from './actionTypes'
import { authMessages } from '../httpmessages'

export const authStart = () => {
  return {
    type: actions.AUTHENTICATION_START
  }
}

export const logout = () => {
  return {
    type: actions.AUTHENTICATION_LOGOUT_SAGA
  }
}

export const logoutSucceed = () => {
  return {
    type: actions.AUTHENTICATION_LOGOUT
  }
}

export const authenticationSuccess = (token, collaborator) => {
  return {
    type: actions.AUTHENTICATION_SUCCESS,
    payload: {
      token: token,
      collaborator: collaborator
    }
  }
}

export const authenticationFail = (err) => {
  return {
    type: actions.AUTHENTICATION_FAIL,
    payload: {
      error: authMessages[`code_${err.message}`] || 'Default Error' // récupère le message associé à l'erreur or default error
    }
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actions.AUTHENTICATION_CHECK_TIMEOUT_SAGA,
    expirationTime: expirationTime // to add prop in action argument in saga
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    payload: {
      path: path
    }
  }
}

export const checkRedirect = () => {
  return {
    type: actions.CHECK_REDIRECT_SAGA
  }
}
export const auth = (username, password) => {
  return {
    type: actions.AUTHENTICATION_USER_SAGA, // call a saga
    payload: {
      username: username,
      password: password
    }
  }
}

export const removeError = () => {
  return {
    type: actions.AUTHENTICATION_REMOVE_ERROR
  }
}

export const authCheckState = () => {
  return {
    type: actions.AUTHENTICATION_INITIATE_CHECK_STATE_SAGA
  }
}

export const authReset = () => {
  return{
    type: actions.AUTHENTICATION_RESET
  }
}
