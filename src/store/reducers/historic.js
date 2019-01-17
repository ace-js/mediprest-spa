import { cloneDeep } from 'lodash'

import * as actions from './../actions/actionTypes'
import { constants } from './../../shared'

const initialState = {
  contactType: 'none',
  sortBy: null,
  sortDirection: constants.FILTER.DIRECTION.ASC,
  isInvoiced: true,
  dateStart: null,
  dateEnd: null,
  page: 1,
  pages: 1,
  total: 0,
  limit: 10,
  pts: [],
  currentPts: null,
  loading: false,
  success: false,
  error: null
}
const validationReducer = (state = initialState, action) => {
  const cloneState = cloneDeep(state)

  switch (action.type) {
    case actions.HISTORIC_FETCH_PTS_FAIL:
      cloneState.error = action.payload.error
      cloneState.success = false
      cloneState.loading = false
      break
    case actions.HISTORIC_FETCH_PTS_SUCCESS:
      cloneState.error = null
      cloneState.loading = false
      cloneState.limit = action.payload.limit
      cloneState.page = action.payload.page
      cloneState.pages = action.payload.totalPages
      cloneState.pts = action.payload.docs
      cloneState.total = action.payload.totalDocs
      break
    case actions.HISTORIC_EDIT_PROP:
      cloneState[action.payload.field] = action.payload.value
  }
  return cloneState
}

export default validationReducer
