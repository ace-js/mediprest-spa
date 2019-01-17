import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, isNull, findIndex } from 'lodash'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import AdminRoute from './components/Navigation/Routes/AdminRoute'
import Auth from './containers/Auth/Auth'
import ConnectionAs from './containers/ConnectionAs/ConnectionAs'
import { constants } from './shared'
import Historic from './containers/Historic/Historic'
import Home from './components/Home/Home'
import Layout from './hoc/Layout/Layout'
import Logout from './containers/Auth/Logout/Logout'
import PrivateRoute from './components/Navigation/Routes/PrivateRoute'
import Validation from './containers/Validation/Validation'
import Billing from './containers/Billing/Billing'
import Messages from './containers/Messages/Messages'
import { authCheckState } from './store/actions'
import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  renderCollabId = () => {
    const { roles, currentPerformer, collaboratorId } = this.props
    return roles && findIndex(roles, (role) => role === 'Billing') !== -1
      ? collaboratorId
      : currentPerformer
      ? get(currentPerformer, '_id', null)
      : null
  }

  render() {
    const {
      isAuthenticated,
      roles,
      inami,
      currentPerformer,
      collaboratorId
    } = this.props
    const currentInami = get(currentPerformer, 'inami', null)
    const isAdmin = currentInami === inami && !isNull(inami)
    const privateParams = {
      isAuth: isAuthenticated,
      roles,
      currentPerformer: !isNull(currentInami)
    }

    return (
      <div className='App'>
        <Layout
          isAuthenticated={this.props.isAuthenticated}
          roles={this.props.roles}
          inami={this.props.inami}
          collabId={this.renderCollabId()}
          activeInami={currentInami}>
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/' exact component={Home} />
            <PrivateRoute
              path='/validation'
              component={Validation}
              {...privateParams}
              acceptedRoles={[constants.ROLES.PERFORMER]}
            />
            <PrivateRoute
              path='/historique'
              component={Historic}
              {...privateParams}
              acceptedRoles={[constants.ROLES.PERFORMER]}
            />
            <PrivateRoute
              path='/facturation-validation'
              component={Billing}
              {...privateParams}
              acceptedRoles={[constants.ROLES.BILLING]}
            />
            <PrivateRoute
              path='/facturation-historique'
              component={Historic}
              {...privateParams}
              acceptedRoles={[constants.ROLES.BILLING]}
            />
            <PrivateRoute
              path='/messages'
              component={Messages}
              {...privateParams}
              acceptedRoles={[
                constants.ROLES.BILLING,
                constants.ROLES.PERFORMER
              ]}
            />
            <PrivateRoute
              path='/logout'
              component={Logout}
              {...privateParams}
            />
            <PrivateRoute
              path='/connexion-en-tant-que'
              component={ConnectionAs}
              {...privateParams}
              acceptedRoles={[constants.ROLES.DELEGATE]}
            />
            <AdminRoute
              path='/administration'
              component={Validation}
              isAuth={isAuthenticated}
              isAdmin={isAdmin}
            />
            <Route render={() => <Redirect to='/' />} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { inami, roles } = state.auth.collaborator
  return {
    isAuthenticated: state.auth.token !== null,
    inami: inami,
    roles: roles,
    currentPerformer: state.connectionAs.currentPerformer,
    collaboratorId: get(state.auth, 'collaborator._id', null)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
