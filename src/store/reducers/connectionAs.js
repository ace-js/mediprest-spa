import * as actions from './../actions/actionTypes'
import { utility } from '../../shared'

const { updateObject } = utility

const initialState = {
  loading: false,
  error: null,
  performers: [],
  currentPerformer: {}
}

const setChoice = (state, action) => {
  return updateObject(state, { currentPerformer: action.payload.performer })
}

const connectionAsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CONNECTION_AS_SET_CHOICE:
      return setChoice(state, action)
    case actions.CONNECTION_AS_FETCH_START:
      return updateObject(state, { loading: true })
    case actions.CONNECTION_AS_FETCH_SUCCESS:
      return updateObject(state, {
        performers: action.payload.performers,
        loading: false
      })
    case actions.CONNECTION_AS_FETCH_FAIL:
      return updateObject(state, {
        error: action.payload.error,
        loading: false
      })
    case actions.CONNECTION_AS_REMOVE_ERROR:
      return updateObject(state, { error: null })
    case actions.CONNECTION_AS_RESET:
      return initialState
    default:
      return state
  }
}

export default connectionAsReducer
