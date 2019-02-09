import {
  PRESTATIONS_FETCH_PRESTATIONS_FAIL,
  PRESTATIONS_FETCH_PRESTATIONS_SUCCESS,
  PRESTATIONS_FETCH_PRESTATIONS_START,
  PRESTATIONS_FETCH_PRESTATIONS_SAGA,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_FAIL,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SAGA,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_START,
  PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SUCCESS,
  PRESTATIONS_INIT_ADMIN_SAGA,
  PRESTATIONS_INIT_ADMIN_SUCCESS,
  PRESTATIONS_INIT_ADMIN_FAILED,
  PRESTATIONS_ADMIN_UPDATE,
  PRESTATIONS_ADMIN_UPDATE_RESET,
  PRESTATIONS_ADMIN_RESET_STATUS,
  PRESTATIONS_ADMIN_SAVE_UPDATE_SAGA,
  PRESTATIONS_ADMIN_SAVE_UPDATE_SUCCESS,
  PRESTATIONS_ADMIN_SAVE_UPDATE_FAILED
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

export const initAdmin = (id) => ({
  type: PRESTATIONS_INIT_ADMIN_SAGA,
  payload: {id}
})

export const initAdminSuccess = (prestations) => ({
  type: PRESTATIONS_INIT_ADMIN_SUCCESS,
  payload: { prestations }
})

export const initAdminFail = () => ({
  type: PRESTATIONS_INIT_ADMIN_FAILED
})

  export const updateAdminPrest = (prestations) => ({
    type: PRESTATIONS_ADMIN_UPDATE, 
    payload: {prestations}
  })

  export const resetUpdateAdminPrest = () => ({
    type: PRESTATIONS_ADMIN_UPDATE_RESET
  })

  export const saveUpdateAdminPrest = (inami, id, prestations) => ({
    type: PRESTATIONS_ADMIN_SAVE_UPDATE_SAGA, 
    payload: {inami, id, prestations}
  })

  export const saveUpdateAdminPrestSuccess = () => ({
    type: PRESTATIONS_ADMIN_SAVE_UPDATE_SUCCESS
  })

  export const saveUpdateAdminPrestFailed = () => ({
    type: PRESTATIONS_ADMIN_SAVE_UPDATE_FAILED
  })

  export const resetAdminPrestStatus = () => ({
    type: PRESTATIONS_ADMIN_RESET_STATUS
  })
