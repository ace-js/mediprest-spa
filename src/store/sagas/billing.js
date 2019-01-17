import { put } from 'redux-saga/effects'
import queryString from 'query-string'
import { omitBy, isNull } from 'lodash'

import axios from '../../axios-mediprest'
import { utility } from './../../shared'
import {
  editFilterPropBilling,
  fetchPtsBillingStart,
  fetchPtsBillingSuccess,
  fetchPtsBillingFail,
  editPtsBillingStart,
  editPtsBillingFail,
  editPtsBillingSuccess,
  resetBillingStatus
} from '../actions'

export function * fetchPtsSagaBilling (action) {
  try {
    yield put(fetchPtsBillingStart())
    const query = queryString.stringify(omitBy(action.payload.query, isNull))
    const response = yield axios.get(`/pts/billing/${action.payload.id}?${query}`)
    yield put(fetchPtsBillingSuccess(response.data))
  } catch (error) {
    yield put(fetchPtsBillingFail(error))
  }
}

export function * editMultipPropsBilling (action) {
  yield action.payload.properties.map(prop =>
    put(editFilterPropBilling(prop.key, prop.value))
  )
}

export function * editPtsBilling (action) {
  try {
    yield put(editPtsBillingStart())
    yield axios.post(
      `/pts/billing/update/${action.payload.id}/${action.payload.pts._id}`,
      { pts: action.payload.pts }
    )
    yield put(editPtsBillingSuccess())
    if (action.payload.isInvoice) {
      yield utility.delay(500) // to reset (loading, error, success) after a validation
      yield put(resetBillingStatus())
    }
  } catch (error) {
    yield put(editPtsBillingFail(error))
  }
}
