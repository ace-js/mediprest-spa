import { put } from 'redux-saga/effects'
import { initDelegationsSuccess, saveUpdatesStart, saveUpdatesSuccess, saveUpdatesFail } from '../actions'
import axios from './../../axios-mediprest'

export function * initDelegationsSaga(action) {
    try {
        const collaboratorsResponse = yield axios.get(`/collaborators/${action.payload.id}`)
        const delegatesResponse = yield axios.get(`/collaborators/${action.payload.inami}/delegates/${action.payload.id}`)
        yield put(initDelegationsSuccess({collaborators: collaboratorsResponse.data, delegates: delegatesResponse.data}))
    } catch (error) {
        console.log('temp error ' , error)
    }
}

export function * saveUpdates(action) {
    try {
        yield put(saveUpdatesStart())
        yield axios.post(`/performers/delegates/${action.payload.inami}`, {delegates: action.payload.delegates})
        yield put(saveUpdatesSuccess())
        
    } catch (error) {
        yield put(saveUpdatesFail())
    }
}