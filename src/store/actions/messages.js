import {MESSAGES_FETCH_UNREAD_AMOUNT_SAGA, MESSAGES_FETCH_UNREAD_AMOUNT_SUCCESS} from './actionTypes'

export const fetchUnreadAmount = (collabId) => ({
    type: MESSAGES_FETCH_UNREAD_AMOUNT_SAGA,
    payload: {collabId}
})

export const fetchUnreadAmountSuccess = (data) => ({
    type: MESSAGES_FETCH_UNREAD_AMOUNT_SUCCESS,
    payload: {data}
})