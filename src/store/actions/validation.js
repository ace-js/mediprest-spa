import * as actions from './actionTypes'

export const fetchPts = (performerId, payload) => ({
  type: actions.VALIDATION_FETCH_PTS_SAGA,
  payload: {query: payload, id: performerId}
})

export const fetchPtsStart = () => ({
  type: actions.VALIDATION_FETCH_PTS_START
})

export const fetchPtsFail = (error) => ({
  type: actions.VALIDATION_FETCH_PTS_FAIL,
  payload: { error }
})

export const fetchPtsSuccess = (data) => ({
  type: actions.VALIDATION_FETCH_PTS_SUCCESS,
  payload: { ...data }
})

export const editFilterProp = (field, value) => ({
  type: actions.VALIDATION_EDIT_PROP,
  payload: { field, value }
})

export const editMultiFilterProp = (properties) => ({
  type: actions.VALIDATION_EDIT_MULTI_PROP,
  payload: { properties }
})

export const editPts = (id, pts, isValidation) => ({
  type: actions.VALIDATION_EDIT_PTS_SAGA,
  payload: { id, pts, isValidation }
})

export const editPtsStart = () => ({
  type: actions.VALIDATION_EDIT_PTS_START
})

export const editPtsFail = (error) => ({
  type: actions.VALIDATION_EDIT_PTS_FAIL,
  payload: { error }
})

export const editPtsSuccess = () => ({
  type: actions.VALIDATION_EDIT_PTS_SUCCESS
})

export const createPts = (id, pts) => ({
  type: actions.VALIDATION_CREATE_PTS_SAGA,
  payload: { id, pts }
})

export const createPtsStart = () => ({
  type: actions.VALIDATION_CREATE_PTS_START
})

export const createPtsFail = (error) => ({
  type: actions.VALIDATION_CREATE_PTS_FAIL,
  payload: { error }
})

export const createPtsSuccess = () => ({
  type: actions.VALIDATION_CREATE_PTS_SUCCESS
})

export const resetStatus = () => ({
  type: actions.VALIDATION_RESET_STATUS
})
