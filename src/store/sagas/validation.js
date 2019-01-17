import { put } from 'redux-saga/effects'
import queryString from 'query-string'
import { omitBy, isNull } from 'lodash'

import axios from '../../axios-mediprest'
import { utility } from './../../shared'
import {
  createPtsFail,
  createPtsStart,
  createPtsSuccess,
  fetchPtsStart,
  fetchPtsFail,
  fetchPtsSuccess,
  editFilterProp,
  editPtsStart,
  editPtsSuccess,
  editPtsFail,
  resetStatus
} from '../actions'

export function * fetchPtsSaga (action) {
  try {
    yield put(fetchPtsStart())
    const query = queryString.stringify(omitBy(action.payload.query, isNull))
    const response = yield axios.get(`/pts/${action.payload.id}?${query}`)
    yield put(fetchPtsSuccess(response.data))
  } catch (error) {
    yield put(fetchPtsFail(error))
  }
}

export function * editMultipProps (action) {
  yield action.payload.properties.map(prop =>
    put(editFilterProp(prop.key, prop.value))
  )
}

export function * editPts (action) {
  try {
    yield put(editPtsStart())
    yield axios.post(
      `/pts/validation/update/${action.payload.id}/${action.payload.pts._id}`,
      { pts: action.payload.pts }
    )
    yield put(editPtsSuccess())
    if (action.payload.isValidation) {
      yield utility.delay(500) // to reset (loading, error, success) after a validation
      yield put(resetStatus())
    }
  } catch (error) {
    yield put(editPtsFail(error))
  }
}

export function * createPts (action) {
  try {
    yield put(createPtsStart())
    yield axios.post(
      `/pts/validation/${action.payload.id}/${action.payload.pts.performer}`,
      { pts: action.payload.pts }
    )
    yield put(createPtsSuccess())
  } catch (error) {
    yield put(createPtsFail(error))
  }
}
