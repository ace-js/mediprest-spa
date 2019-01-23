import { cloneDeep } from 'lodash'

import * as actions from './../actions/actionTypes'

const initialState = {
  unreadAmount: 0,
  direction: null,
  isUnread: null,
  messages: []
}

const messagesReducer = (state = initialState, action) => {
  const cloneState = cloneDeep(state)

  switch (action.type) {
    case actions.MESSAGES_FETCH_UNREAD_AMOUNT_SUCCESS:
      cloneState.unreadAmount = action.payload.data.amount
      break
    case actions.MESSAGES_FETCH_MESSAGES_SUCCESS:
     cloneState.messages = action.payload.data.messages
    default:
      break
  }
  return cloneState
}

export default messagesReducer
