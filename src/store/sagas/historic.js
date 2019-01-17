import { put } from 'redux-saga/effects'
import queryString from 'query-string'
import { omitBy, isNull } from 'lodash'

import axios from '../../axios-mediprest'
import {
  fetchPtsHistoricFail,
  fetchPtsHistoricStart,
  fetchPtsHistoricSuccess,
  editFilterPropHistoric
} from '../actions'

export function * fetchPtsHistoricSaga (action) {
  try {
    yield put(fetchPtsHistoricStart())
    const query = queryString.stringify(omitBy(action.payload, isNull))
    const url = action.isBilling ? `/pts/billing/${action.id}?${query}` :  `/pts/${action.id}?${query}`
    const response = yield axios.get(url)
    yield put(fetchPtsHistoricSuccess(response.data))
  } catch (error) {
    yield put(fetchPtsHistoricFail(error))
  }
}

export function * editMultipPropsHistoric (action) {
  yield action.payload.properties.map(prop =>
    put(editFilterPropHistoric(prop.key, prop.value))
  )
}
