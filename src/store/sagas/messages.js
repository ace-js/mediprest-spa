import { put } from 'redux-saga/effects'

import axios from '../../axios-mediprest'
import {
  fetchUnreadAmountSuccess,
  fetchMessagesSuccess,
  setActiveMessage
} from '../actions'

export function* fetchUnreadAmountSaga(action) {
  try {
    const response = yield axios.get(
      `/messages/amount/${
        action.payload.collabId
      }?unread=false&direction=RECEIVED`
    )
    yield put(fetchUnreadAmountSuccess(response.data))
  } catch (error) {
    console.log('temp error')
  }
}

export function* fetchMessagesSaga(action) {
  try {
    const response = yield axios.get(`/messages/${action.payload.collabId}`)
    yield put(fetchMessagesSuccess(response.data))
  } catch (error) {
    console.log('temp error')
  }
}

export function* updateActiveMessage(action) {
  try {
    const response = yield axios.post(
      `/messages/${action.payload.collabId}/${action.payload.message.id}`,
      {message: action.payload.message}
    )

    yield put(fetchUnreadAmountSaga(action.payload.collabId))
    yield put(setActiveMessage(action.payload.message))
  } catch (error) {
    console.log('temp error')
  }
}
