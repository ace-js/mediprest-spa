import {
  PRESTATIONS_FETCH_PRESTATIONS_FAIL,
  PRESTATIONS_FETCH_PRESTATIONS_SUCCESS,
  PRESTATIONS_FETCH_PRESTATIONS_START,
  PRESTATIONS_FETCH_PRESTATIONS_SAGA,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_FAIL,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SAGA,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_START,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SUCCESS
} from './actionTypes'

export const fetchPrestations = () => ({
  type: PRESTATIONS_FETCH_PRESTATIONS_SAGA
})

export const fetchPrestationsStart = () => ({
  type: PRESTATIONS_FETCH_PRESTATIONS_START
})

export const fetchPrestationsFail = error => ({
  type: PRESTATIONS_FETCH_PRESTATIONS_FAIL,
  payload: { error }
})

export const fetchPerstationsSuccess = prestations => ({
  type: PRESTATIONS_FETCH_PRESTATIONS_SUCCESS,
  payload: { prestations }
})

export const fetchPerformerPrestations = (id, isFavorite) => ({
  type: PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SAGA,
  payload: { id, isFavorite }
})

export const fetchPerformerPrestationsStart = () => ({
  type: PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_START
})

export const fetchPerformerPrestationsFail = error => ({
  type: PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_FAIL,
  payload: { error }
})

export const fetchPerformerPerstationsSuccess = prestations => ({
  type: PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SUCCESS,
  payload: { prestations }
})
