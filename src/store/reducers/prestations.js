import { cloneDeep } from 'lodash'

import {
  PRESTATIONS_FETCH_PRESTATIONS_FAIL,
  PRESTATIONS_FETCH_PRESTATIONS_START,
  PRESTATIONS_FETCH_PRESTATIONS_SUCCESS,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_FAIL,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_START,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SUCCESS,
  PRESTATIONS_INIT_ADMIN_SUCCESS,
  PRESTATIONS_ADMIN_UPDATE_RESET,
  PRESTATIONS_ADMIN_SAVE_UPDATE_FAILED,
  PRESTATIONS_ADMIN_SAVE_UPDATE_SUCCESS,
  PRESTATIONS_ADMIN_RESET_STATUS
} from './../actions/actionTypes'

const initialState = {
  loading: false,
  error: null,
  prestations: [],
  prestationsAdmin: [],
  prestationsBaseAdmin: [],
  updateError: false,
  updateSuccess: false
}

const prestationsReducer = (state = initialState, action) => {
  const cloneState = cloneDeep(state)

  switch (action.type) {
    case PRESTATIONS_FETCH_PRESTATIONS_START:
    case PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_START:
      cloneState.loading = true
      cloneState.error = null
      break
    case PRESTATIONS_FETCH_PRESTATIONS_FAIL:
    case PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_FAIL:
      cloneState.error = action.payload.error
      cloneState.loading = false
      break
    case PRESTATIONS_FETCH_PRESTATIONS_SUCCESS:
    case PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SUCCESS:
      cloneState.error = null
      cloneState.loading = false
      cloneState.prestations = action.payload.prestations
      break
    case PRESTATIONS_INIT_ADMIN_SUCCESS:
      cloneState.prestationsBaseAdmin = action.payload.prestations
      cloneState.prestationsAdmin = cloneDeep(cloneState.prestationsBaseAdmin)
      break
    case PRESTATIONS_ADMIN_UPDATE_RESET:
      cloneState.prestationsAdmin = cloneDeep(cloneState.prestationsBaseAdmin)
      break
    case PRESTATIONS_ADMIN_SAVE_UPDATE_FAILED:
    cloneState.updateError = true
    cloneState.updateSuccess = false
    break
    case PRESTATIONS_ADMIN_SAVE_UPDATE_SUCCESS:
    cloneState.updateError = false
    cloneState.updateSuccess = true
    cloneState.prestationsBaseAdmin = cloneDeep(cloneState.prestationsAdmin)
    break
    case PRESTATIONS_ADMIN_RESET_STATUS:
    cloneState.updateError = false
    cloneState.updateSuccess = false
    break
  }
  return cloneState
}

export default prestationsReducer
