import { takeEvery, all } from 'redux-saga/effects'
import * as actions from '../actions/actionTypes'
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  checkStateSaga,
  checkRedirectSaga
} from './auth'
import { fetchPerformersSaga, setChoiceSaga } from './connectionAs'
import { fetchPtsSaga, editMultipProps, editPts, createPts } from './validation'
import { fetchPrestations, fetchPerformerPrestations } from './prestations'
import { fetchPtsHistoricSaga, editMultipPropsHistoric } from './historic'
import {
  editMultipPropsBilling,
  editPtsBilling,
  fetchPtsSagaBilling
} from './billing'
import {fetchUnreadAmountSaga, fetchMessagesSaga} from './messages'

export function * watchAuth () {
  yield all([
    //
    takeEvery(actions.AUTHENTICATION_LOGOUT_SAGA, logoutSaga), // (action to listen , action to run)
    takeEvery(actions.AUTHENTICATION_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actions.AUTHENTICATION_USER_SAGA, authSaga),
    takeEvery(actions.CHECK_REDIRECT_SAGA, checkRedirectSaga),
    takeEvery(actions.AUTHENTICATION_INITIATE_CHECK_STATE_SAGA, checkStateSaga)
  ])
}

export function * watchConnectionAs () {
  yield all([
    takeEvery(actions.CONNECTION_AS_INIT_SET_CHOICE_SAGA, setChoiceSaga),
    takeEvery(actions.CONNECTION_AS_FETCH_SAGA, fetchPerformersSaga)
  ])
}

export function * watchValidation () {
  yield all([
    takeEvery(actions.VALIDATION_FETCH_PTS_SAGA, fetchPtsSaga),
    takeEvery(actions.VALIDATION_EDIT_MULTI_PROP, editMultipProps),
    takeEvery(actions.VALIDATION_EDIT_PTS_SAGA, editPts),
    takeEvery(actions.VALIDATION_CREATE_PTS_SAGA, createPts)
  ])
}

export function * watchHistoric () {
  yield all([
    takeEvery(actions.HISTORIC_FETCH_PTS_SAGA, fetchPtsHistoricSaga),
    takeEvery(actions.HISTORIC_EDIT_MULTI_PROP, editMultipPropsHistoric)
  ])
}

export function * watchPrestations () {
  yield all([
    takeEvery(actions.PRESTATIONS_FETCH_PRESTATIONS_SAGA, fetchPrestations),
    takeEvery(
      actions.PRESTATIONS_FETCH_PERFORMER_PRESTATIONS_SAGA,
      fetchPerformerPrestations
    )
  ])
}

export function * watchBilling () {
  yield all([
    takeEvery(actions.BILLING_FETCH_PTS_SAGA, fetchPtsSagaBilling),
    takeEvery(actions.BILLING_EDIT_MULTI_PROP, editMultipPropsBilling),
    takeEvery(actions.BILLING_EDIT_PTS_SAGA, editPtsBilling)
  ])
}

export function * watchMessages () {
  yield all([
    takeEvery(actions.MESSAGES_FETCH_UNREAD_AMOUNT_SAGA, fetchUnreadAmountSaga),
    takeEvery(actions.MESSAGES_FETCH_MESSAGES_SAGA, fetchMessagesSaga)
  ])
}
