import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, intersection, findIndex } from 'lodash'
import { constants } from './../../../shared'
import { Route } from 'react-router-dom'
import Home from './../../Home/Home'

const hasAccess = (acceptedRoles, roles, currentPerformer) => {
  if (isEmpty(acceptedRoles)) {
    return true
  } else {
    if (
      findIndex(acceptedRoles, role => role === constants.ROLES.PERFORMER) !== -1 &&
      findIndex(roles, role => role === constants.ROLES.PERFORMER || role === constants.ROLES.DELEGATE) !== -1
    ) {
      return currentPerformer
    } else {
      return !isEmpty(intersection(acceptedRoles, roles))
    }
  }
}

const PrivateRoute = ({ component: Component, path, isAuth, acceptedRoles, roles, currentPerformer }) => (
  <Route
    path={path}
    render={() => (isAuth && hasAccess(acceptedRoles, roles, currentPerformer) ? <Component /> : <Home />)}
  />
)

PrivateRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isAuth: PropTypes.bool,
  currentPerformer: PropTypes.bool
}
PrivateRoute.defaultProps = {
  acceptedRoles: [],
  isAuth: false,
  currentPerformer: false
}

export default PrivateRoute
