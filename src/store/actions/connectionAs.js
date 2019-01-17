import * as actions from './actionTypes'

export const fetchPerformers = (collaboratorId) => {
  return {
    type: actions.CONNECTION_AS_FETCH_SAGA,
    payload: {collaboratorId: collaboratorId}
  }
}

export const fetchStart = () => {
  return {
    type: actions.CONNECTION_AS_FETCH_START
  }
}

export const fetchSuccess = (performers) => {
  return {
    type: actions.CONNECTION_AS_FETCH_SUCCESS,
    payload: {performers: performers}
  }
}

export const fetchFail = (errorMessage) => {
  return {
    type: actions.CONNECTION_AS_FETCH_FAIL,
    payload: {error: errorMessage}
  }
}

export const initSetChoice = (performer) => {
  return {
    type: actions.CONNECTION_AS_INIT_SET_CHOICE_SAGA,
    payload: {performer: performer}
  }
}

export const setChoice = (performer) => {
  return {
    type: actions.CONNECTION_AS_SET_CHOICE,
    payload: {performer: performer}
  }
}

export const removeError = () => {
  return {
    type: actions.CONNECTION_AS_REMOVE_ERROR
  }
}

export const resetConnectionAs = () => {
  return {
    type: actions.CONNECTION_AS_RESET
  }
}
