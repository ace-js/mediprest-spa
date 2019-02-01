import {MESSAGES_FETCH_UNREAD_AMOUNT_SAGA, MESSAGES_FETCH_UNREAD_AMOUNT_SUCCESS, MESSAGES_FETCH_MESSAGES_SAGA, MESSAGES_FETCH_MESSAGES_SUCCESS, MESSAGES_FETCH_MESSAGES_FAIL, MESSAGES_SET_ACTIVE_MESSAGE, MESSAGES_UPDATE_ACTIVE_MESSAGE_SAGA} from './actionTypes'

export const fetchUnreadAmount = (collabId) => ({
    type: MESSAGES_FETCH_UNREAD_AMOUNT_SAGA,
    payload: {collabId}
})

export const fetchUnreadAmountSuccess = (data) => ({
    type: MESSAGES_FETCH_UNREAD_AMOUNT_SUCCESS,
    payload: {data}
})

export const fetchMessages = (collabId) => ({
    type: MESSAGES_FETCH_MESSAGES_SAGA,
    payload: {collabId}
})

export const fetchMessagesSuccess = (data) => ({
    type: MESSAGES_FETCH_MESSAGES_SUCCESS,
    payload: {data}
})

export const setActiveMessage = (message) => ({
    type: MESSAGES_SET_ACTIVE_MESSAGE,
    payload: {message}
})

export const updateActiveMessage = (message, collabId) => ({
    type: MESSAGES_UPDATE_ACTIVE_MESSAGE_SAGA,
    payload: {message, collabId}
})