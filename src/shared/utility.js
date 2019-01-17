import React from 'react'
import { noop } from 'lodash'

import * as colors from '@material-ui/core/colors'
import { isNull } from 'lodash'
import constants from './constants'

/**
 * Return a new object to avoid mutation
 *
 * @param {object} oldObject
 * @param {object} updatedValues
 * @returns object
 */
const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  }
}

/**
 * Controls and return errors based on input's rules
 *
 * @param {input value } value
 * @param {object} rules
 * @returns {{isValid: boolean, errors: Array}}
 */
const checkValidity = (value, rules) => {
  let isValid = true
  let errorMessages = []
  if (rules.required) {
    isValid = value.trim() !== ''
    if (!isValid) {
      errorMessages.push(<p key='error-required'>This field can't be empty</p>)
    }
  }

  if (rules.minLength) {
    const inputIsValid = value.trim().length >= rules.minLength
    isValid = inputIsValid && isValid
    if (!inputIsValid) {
      errorMessages.push(
        <p key='error-minlength'>
          This field can't be lower than {rules.minLength}
        </p>
      )
    }
  }

  if (rules.maxLength) {
    const inputIsValid = value.trim().length <= rules.maxLength
    isValid = inputIsValid && isValid
    if (!inputIsValid) {
      errorMessages.push(
        <p key='error-maxlength'>
          This field can't be higher than {rules.maxLength}
        </p>
      )
    }
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const inputIsValid = pattern.test(value)
    isValid = inputIsValid && isValid
    if (!inputIsValid) {
      errorMessages.push(
        <p key='error-email'>This field must be an email address</p>
      )
    }
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/
    const inputIsValid = pattern.test(value)
    isValid = inputIsValid && isValid
    if (!inputIsValid) {
      errorMessages.push(
        <p key='error-numeric'>This field must be a numeric </p>
      )
    }
  }
  const errors = errorMessages
  return { isValid, errors }
}

/**
 * Return the fully build CSS property based on a type (f.e.: margin-right) and the values of the reference object passed to this function.
 *
 * @param {string} type
 * @param {object} refObj
 * @param {string} key
 * @returns Fully build CSS property
 */
const getValueForKey = (type, refObj, key) => {
  if (!key) return
  if (typeof refObj[key] === 'undefined') {
    throw new Error(`No valid value "${key}" found for ${type}`)
  }

  return `${type}: ${refObj[key]} !important;`
}

const tableStyle = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: colors.grey[100]
    },
    '.validated': {
      backgroundColor: colors.red[100]
    }
  }
})

const getRowBg = (pts, contextType) => {
  let color
  if (contextType === constants.CONTEXT.FACTURATION) {
    color =
      isNull(pts.disagreement) || pts.disagreement.traited
        ? ''
        : colors.red[100]
  } else {
    color = pts.isInvoiced
      ? ''
      : pts.isValidated
      ? colors.green[100]
      : isNull(pts.disagreement)
      ? ''
      : pts.disagreement.traited
      ? colors.blue[100]
      : colors.red[100]
  }
  return { backgroundColor: color }
}

const delay = async (ms) => {
  const temp = await new Promise((resolve) =>
    setTimeout(() => resolve(true), ms)
  )
  return temp
}

export default {
  checkValidity,
  getRowBg,
  getValueForKey,
  tableStyle,
  updateObject,
  delay
}
