import { put } from 'redux-saga/effects'
import queryString from 'query-string'
import { omitBy, isNull } from 'lodash'

import axios from '../../axios-mediprest'
import {
    fetchUnreadAmountSuccess, fetchMessagesSuccess
  } from '../actions'

  export function* fetchUnreadAmountSaga (action) {
      try {
          const response = yield axios.get(`/messages/amount/${action.payload.collabId}?unread=false&direction=RECEIVED`)
          yield put(fetchUnreadAmountSuccess(response.data))
      } catch (error) {
          console.log('temp error')
      }
  }

  export function* fetchMessagesSaga (action) {
      try {
          const response = yield axios.get(`/messages/${action.payload.collabId}`)
          yield put(fetchMessagesSuccess(response.data))
      } catch (error) {
          console.log('temp error')
      }
  }