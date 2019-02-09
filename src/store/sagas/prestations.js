import { put } from 'redux-saga/effects'
import omit from 'lodash/omit'

import axios from './../../axios-mediprest'
import {
  fetchPrestationsStart,
  fetchPerstationsSuccess,
  fetchPrestationsFail,
  fetchPerformerPerstationsSuccess,
  fetchPerformerPrestationsFail,
  fetchPerformerPrestationsStart,
  initAdminSuccess,
  initAdminFail,
  saveUpdateAdminPrestSuccess,
  saveUpdateAdminPrestFailed
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

export function *  initAdminPrestations (action) {
  try {
    const response = yield axios.get(`/prestations-all/${action.payload.id}`)
    yield put(initAdminSuccess(response.data))
  } catch (error) {
    yield put(initAdminFail())
  }
}

export function *  saveAdminUpdates (action) {
  try {
    const prestations = action.payload.prestations.map(presta => ({
      _id: presta._id,
      isFavorite: presta.isFavorite,
      amount: presta.times
    }))

    yield axios.post(`/prestations/${action.payload.inami}/${action.payload.id}`, {prestations})
    yield put(saveUpdateAdminPrestSuccess())
  } catch (error) {
    yield put(saveUpdateAdminPrestFailed())
  }
}
