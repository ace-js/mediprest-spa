import { put } from 'redux-saga/effects'
import { setChoice, fetchSuccess, fetchStart, fetchFail } from '../actions'
import axios from './../../axios-mediprest'

export function * fetchPerformersSaga (action) {
  yield put(fetchStart())
  try {
    const response = yield axios.get(`performers/${action.payload.collaboratorId}`)
    const performers = yield response.data

    yield put(fetchSuccess(performers))
  } catch (err) {
    yield put(fetchFail('Booom'))
  }
}

export function * setChoiceSaga (action) {
  yield localStorage.setItem('currentPerformer', JSON.stringify(action.payload.performer))
  yield put(setChoice(action.payload.performer))
}
