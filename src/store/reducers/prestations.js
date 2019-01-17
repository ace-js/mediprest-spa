import { cloneDeep } from 'lodash'

import {
  PRESTATIONS_FETCH_PRESTATIONS_FAIL,
  PRESTATIONS_FETCH_PRESTATIONS_START,
  PRESTATIONS_FETCH_PRESTATIONS_SUCCESS,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_FAIL,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_START,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SUCCESS
} from './../actions/actionTypes'

const initialState = {
  loading: false,
  error: null,
  prestations: []
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
  }
  return cloneState
}

export default prestationsReducer
