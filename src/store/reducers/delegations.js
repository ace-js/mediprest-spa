import { cloneDeep } from 'lodash'
import {
  DELEGATIONS_INIT_SUCCESS,
  DELEGATIONS_CANCEL_UPDATES,
  DELEGATIONS_UPDATE,
  DELEGATIONS_SAVE_UPDATE_START,
  DELEGATIONS_SAVE_UPDATE_FAIL,
  DELEGATIONS_SAVE_UPDATE_SUCCESS,
  DELEGATIONS_RESET_STATUS
} from '../actions/actionTypes'

const initialState = {
  collaborators: [],
  delegates: [],
  delegatesBase: [],
  loading: false,
  error: false,
  success: false
}

const reducer = (state = initialState, action) => {
  const cloneState = cloneDeep(state)

  switch (action.type) {
    case DELEGATIONS_INIT_SUCCESS:
      cloneState.collaborators = action.payload.collaborators || []
      cloneState.delegatesBase = action.payload.delegates || []
      cloneState.delegates = [...cloneState.delegatesBase]
      break
    case DELEGATIONS_UPDATE:
      cloneState.delegates = [...action.payload.delegates]
      break
    case DELEGATIONS_CANCEL_UPDATES:
      cloneState.delegates = [...cloneState.delegatesBase]
      break
    case DELEGATIONS_SAVE_UPDATE_START:
      cloneState.loading = true
      cloneState.error = false
      cloneState.success = false
      break
    case DELEGATIONS_SAVE_UPDATE_FAIL:
      cloneState.loading = false
      cloneState.error = true
      cloneState.success = false
      break
    case DELEGATIONS_SAVE_UPDATE_SUCCESS:
      cloneState.loading = false
      cloneState.error = false
      cloneState.success = true
      cloneState.delegatesBase = [...cloneState.delegates]
      break
    case DELEGATIONS_RESET_STATUS:
      cloneState.loading = false
      cloneState.error = false
      cloneState.success = false
      break
    default:
      break
  }
  return cloneState
}

export default reducer
