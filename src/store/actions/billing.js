import * as actions from './actionTypes'

export const fetchPtsBilling = (performerId, payload) => ({
  type: actions.BILLING_FETCH_PTS_SAGA,
  payload: {query: payload, id: performerId}
})

export const fetchPtsBillingStart = () => ({
  type: actions.BILLING_FETCH_PTS_START
})

export const fetchPtsBillingFail = (error) => ({
  type: actions.BILLING_FETCH_PTS_FAIL,
  payload: { error }
})

export const fetchPtsBillingSuccess = (data) => ({
  type: actions.BILLING_FETCH_PTS_SUCCESS,
  payload: { ...data }
})

export const editFilterPropBilling = (field, value) => ({
  type: actions.BILLING_EDIT_PROP,
  payload: { field, value }
})

export const editMultiFilterPropBilling = (properties) => ({
  type: actions.BILLING_EDIT_MULTI_PROP,
  payload: { properties }
})

export const editPtsBilling = (id, pts, isInvoice) => ({
  type: actions.BILLING_EDIT_PTS_SAGA,
  payload: { id, pts, isInvoice }
})

export const editPtsBillingStart = () => ({
  type: actions.BILLING_EDIT_PTS_START
})

export const editPtsBillingFail = (error) => ({
  type: actions.BILLING_EDIT_PTS_FAIL,
  payload: { error }
})

export const editPtsBillingSuccess = () => ({
  type: actions.BILLING_EDIT_PTS_SUCCESS
})

export const resetBillingStatus = () => ({
  type: actions.BILLING_RESET_STATUS
})
