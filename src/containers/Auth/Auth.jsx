import React, { Component, Fragment } from 'react'
import { connect }                    from 'react-redux'
import { Redirect }                   from 'react-router-dom'
import { forEach, isEmpty, isNull }   from 'lodash'
import RaisedButton                   from 'material-ui/RaisedButton'
import TextField                      from 'material-ui/TextField'

import Dialog                from '../../components/UI/Dialog/Dialog'
import { auth, removeError } from '../../store/actions'
import Spinner               from '../../components/UI/Spinner/Spinner'
import './Auth.css'
import { utility }           from '../../shared'

const { checkValidity, updateObject } = utility

class Auth extends Component {
  state = {
    controls: {
      username: {
        value: '',
        errors: [],
        valid: false,
        shouldDisplayError: false,
        validation: {
          required: true,
          minLength: 6
        }
      },
      password: {
        value: '',
        valid: false,
        errors: [],
        houldDisplayError: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    },
    formIsValid: false
  }

  onInputChangeHandler = (event, inputName) => {
    const { isValid, errors } = checkValidity(event.target.value, this.state.controls[inputName].validation)
    const updatedControlsEl = updateObject(this.state.controls[inputName], {
      value: event.target.value,
      errors: errors,
      valid: isValid
    })

    const updatedControls = updateObject(this.state.controls, {
      [inputName]: updatedControlsEl
    })

    let formIsValid = true
    forEach(updatedControls, (control) => {
      formIsValid = control.valid && formIsValid
    })

    this.setState({
      controls: {
        ...updatedControls
      },
      formIsValid: formIsValid
    })
  }

  onFocusHandler = (inputName, shouldDisplayError) => {
    // to render errormessage if we leave the field
    const updatedControlsEl = updateObject(this.state.controls[inputName], {
      shouldDisplayError: shouldDisplayError && !isEmpty(this.state.controls[inputName].errors)
    })
    const updatedControls = updateObject(this.state.controls, {
      [inputName]: updatedControlsEl
    })

    this.setState({
      controls: updatedControls
    })
  }

  onSubmitHandler = (event) => {
    event.preventDefault()
    const { username, password } = this.state.controls
    this.props.onAuth(username.value, password.value)
  }

  onCloseDialogHandler = () => {
    this.props.onRemoveError()
  }

  render () {
    let authRedirect = null
    if (this.props.isAuthenticated && !isEmpty(this.props.authRedirectPath)) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    let errorDialog = null
    if (this.props.error) {
      const buttons = [
        {
          label: 'Fermer',
          primary: true,
          onClick: this.onCloseDialogHandler
        }
      ]
      errorDialog = (
        <Dialog
          buttons={buttons}
          title='Erreur'
          isOpen={!isNull(this.state.error)}
          closed={this.onCloseDialogHandler}
        >
          {' '}
          {this.props.error}{' '}
        </Dialog>
      )
    }

    let content = <Spinner/>
    if (!this.props.loading) {
      const { username, password } = this.state.controls
      content = (
        <Fragment>
          <h2> Authentification </h2>
          <hr/>
          <form onSubmit={this.onSubmitHandler}>
            <TextField
              type='text'
              floatingLabelText='Indentifiant'
              errorText={username.shouldDisplayError ? username.errors : ''}
              value={username.value}
              onChange={(e) => this.onInputChangeHandler(e, 'username')}
              onBlur={() => this.onFocusHandler('username', true)}
              onFocus={() => this.onFocusHandler('username', false)}
            />{' '}
            <br/>
            <TextField
              type='password'
              floatingLabelText='Mot de passe'
              value={password.value}
              errorText={password.shouldDisplayError ? password.errors : ''}
              onChange={(e) => this.onInputChangeHandler(e, 'password')}
              onBlur={() => this.onFocusHandler('password', true)}
              onFocus={() => this.onFocusHandler('password', false)}
            />{' '}
            <br/>
            <br/>
            <RaisedButton
              type='submit'
              label='Connexion'
              primary={true}
              fullWidth={false}
              disabled={!this.state.formIsValid}
            />{' '}
          </form>
          {' '}
        </Fragment>
      )
    }
    return (
      <div className='Auth'>
        {' '}
        {errorDialog} {content} {authRedirect}{' '}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    error: state.auth.error,
    authRedirectPath: state.auth.authRedirectPath
  }
}
const mapDispactToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(auth(username, password)),
    onRemoveError: () => dispatch(removeError())
  }
}

export default connect(mapStateToProps, mapDispactToProps)(Auth)
