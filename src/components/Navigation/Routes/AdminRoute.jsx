import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Home from './../../Home/Home'

const AdminRoute = ({ component: Component, path, isAuth, isAdmin }) => (
  <Route path={path} render={() => (isAuth && isAdmin ? <Component /> : <Home />)} />
)

AdminRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  isAuth: PropTypes.bool,
  isAdmin: PropTypes.bool
}
AdminRoute.defaultProps = {
  isAuth: false,
  isAdmin: false
}

export default AdminRoute
