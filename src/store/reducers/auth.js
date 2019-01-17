import * as actions from '../actions/actionTypes'
import { utility } from '../../shared'

const { updateObject } = utility

const initialState = {
  loading: false,
  token: null,
  collaborator: {},
  authRedirectPath: '',
  error: null
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    collaborator: action.payload.collaborator,
    loading: false,
    error: null
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: 'Authentification échouée'
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    collaborator: {},
    authRedirectPath: ''
  })
}
const setAuthRedirectPath = (state, action) => {
  const updatedCollab = updateObject(state.collaborator, {
    activeInami: action.payload.activeInami
  })
  return updateObject(state, {
    authRedirectPath: action.payload.path,
    collaborator: updatedCollab
  })
}

const removeError = (state, action) => {
  return updateObject(state, { error: null })
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTHENTICATION_START:
      return authStart(state, action)

    case actions.AUTHENTICATION_SUCCESS:
      return authSuccess(state, action)

    case actions.AUTHENTICATION_FAIL:
      return authFail(state, action)

    case actions.AUTHENTICATION_LOGOUT:
      return authLogout(state, action)

    case actions.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action)

    case actions.AUTHENTICATION_REMOVE_ERROR:
      return removeError(state, action)

    case actions.AUTHENTICATION_RESET:
      return initialState

    default:
      return state
  }
}
export default authReducer
