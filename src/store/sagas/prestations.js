import { put } from 'redux-saga/effects'

import axios from './../../axios-mediprest'
import {
  fetchPrestationsStart,
  fetchPerstationsSuccess,
  fetchPrestationsFail,
  fetchPerformerPerstationsSuccess,
  fetchPerformerPrestationsFail,
  fetchPerformerPrestationsStart
} from './../actions'

export function * fetchPrestations (action) {
  try {
    yield put(fetchPrestationsStart())
    const response = yield axios.get('/prestations')
    yield put(fetchPerstationsSuccess(response.data))
  } catch (error) {
    yield put(fetchPrestationsFail(error))
  }
}

export function * fetchPerformerPrestations (action) {
  try {
    yield put(fetchPerformerPrestationsStart())
    const response = yield axios.get(`/prestations/${action.payload.id}?isFavorite=${action.payload.isFavorite}`)
    yield put(fetchPerformerPerstationsSuccess(response.data))
  } catch (error) {
    yield put(fetchPerformerPrestationsFail(error))
  }
}
