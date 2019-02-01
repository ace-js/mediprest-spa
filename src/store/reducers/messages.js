import { cloneDeep } from 'lodash'

import * as actions from './../actions/actionTypes'

const initialState = {
  unreadAmount: 0,
  direction: null,
  isUnread: null,
  messages: [],
  activeMessage: {}
}

const messagesReducer = (state = initialState, action) => {
  const cloneState = cloneDeep(state)

  switch (action.type) {
    case actions.MESSAGES_FETCH_UNREAD_AMOUNT_SUCCESS:
      cloneState.unreadAmount = action.payload.data.amount
      break
    case actions.MESSAGES_FETCH_MESSAGES_SUCCESS:
     cloneState.messages = action.payload.data.messages
    case actions.MESSAGES_SET_ACTIVE_MESSAGE:
     cloneState.activeMessage = action.payload.message
     if(action.payload.message){
      cloneState.messages = cloneState.messages.map(item => item.id === action.payload.message.id ? action.payload.message : item)
     }
    default:
      break
  }
  return cloneState
}

export default messagesReducer
