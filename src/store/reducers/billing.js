import { cloneDeep } from 'lodash'

import * as actions from './../actions/actionTypes'
import { constants } from './../../shared'

const initialState = {
  contactType: 'none',
  status: 'T',
  sortBy: null,
  sortDirection: constants.FILTER.DIRECTION.ASC,
  page: 1,
  pages: 1,
  total: 0,
  limit: 10,
  pts: [],
  isInvoiced: false,
  loading: false,
  success: false,
  error: null
}
const billingReducer = (state = initialState, action) => {
  const cloneState = cloneDeep(state)

  switch (action.type) {
    case actions.BILLING_EDIT_PTS_START:
      cloneState.loading = true
      cloneState.success = false
      cloneState.error = null
      break
    case actions.BILLING_RESET_STATUS:
      cloneState.loading = false
      cloneState.success = false
      cloneState.error = null
      break
    case actions.BILLING_FETCH_PTS_FAIL:
    case actions.BILLING_EDIT_PTS_FAIL:
      cloneState.error = action.payload.error
      cloneState.success = false
      cloneState.loading = false
      break
    case actions.BILLING_EDIT_PTS_SUCCESS:
      cloneState.success = true
      cloneState.error = null
      cloneState.loading = false
      break
    case actions.BILLING_FETCH_PTS_SUCCESS:
      cloneState.error = null
      cloneState.loading = false
      cloneState.limit = action.payload.limit
      cloneState.page = action.payload.page
      cloneState.pages = action.payload.totalPages
      cloneState.pts = action.payload.docs
      cloneState.total = action.payload.totalDocs
      break
    case actions.BILLING_EDIT_PROP:
      cloneState[action.payload.field] = action.payload.value
  }
  return cloneState
}

export default billingReducer
