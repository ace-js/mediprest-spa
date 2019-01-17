import * as actions from './actionTypes'

export const fetchPtsHistoric = (id, payload, isBilling) => ({
  type: actions.HISTORIC_FETCH_PTS_SAGA,
  payload,
  id,
  isBilling
})

export const fetchPtsHistoricStart = () => ({
  type: actions.HISTORIC_FETCH_PTS_START
})

export const fetchPtsHistoricFail = error => ({
  type: actions.HISTORIC_FETCH_PTS_FAIL,
  payload: { error }
})

export const fetchPtsHistoricSuccess = data => ({
  type: actions.HISTORIC_FETCH_PTS_SUCCESS,
  payload: { ...data }
})

export const editFilterPropHistoric = (field, value) => ({
  type: actions.HISTORIC_EDIT_PROP,
  payload: { field, value }
})

export const editMultiFilterPropHistoric = properties => ({
  type: actions.HISTORIC_EDIT_MULTI_PROP,
  payload: { properties }
})
