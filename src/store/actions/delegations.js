import {
  DELEGATIONS_INIT_SAGA,
  DELEGATIONS_INIT_SUCCESS,
  DELEGATIONS_CANCEL_UPDATES,
  DELEGATIONS_UPDATE,
  DELEGATIONS_SAVE_UPDATE_SAGA,
  DELEGATIONS_SAVE_UPDATE_START,
  DELEGATIONS_SAVE_UPDATE_FAIL,
  DELEGATIONS_RESET_STATUS,
  DELEGATIONS_SAVE_UPDATE_SUCCESS
} from './actionTypes'

export const initDelegations = (inami, id) => ({
  type: DELEGATIONS_INIT_SAGA,
  payload: { inami, id }
})

export const initDelegationsSuccess = (payload) => ({
  type: DELEGATIONS_INIT_SUCCESS,
  payload
})

export const updateDelegates = (delegates) => ({
  type: DELEGATIONS_UPDATE,
  payload: { delegates }
})

export const cancelUpdates = () => ({
  type: DELEGATIONS_CANCEL_UPDATES
})

export const saveUpdates = (inami, delegates) => ({
  type: DELEGATIONS_SAVE_UPDATE_SAGA,
  payload: {inami, delegates}
})

export const saveUpdatesStart = () => ({
  type: DELEGATIONS_SAVE_UPDATE_START
})

export const saveUpdatesFail = () => ({
  type: DELEGATIONS_SAVE_UPDATE_FAIL
})

export const saveUpdatesSuccess = () => ({
  type: DELEGATIONS_SAVE_UPDATE_SUCCESS
})

export const resetStatusDelegations = () => ({
  type: DELEGATIONS_RESET_STATUS
})