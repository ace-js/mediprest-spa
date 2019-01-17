import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import {
  Dialog,
  DialogTitle,
  withMobileDialog,
} from '@material-ui/core'

import { resetStatus, editPts } from './../../../store/actions'
import { FlexContainer } from './../../../components/UI/Layout'
import DisagreementNotification
  from '../../../components/Modals/Validation/DisagreementNotification'
import Spinner from '../../../components/UI/Spinner/Spinner'
import DisagreementForm
  from '../../../components/Modals/Validation/DisagreementForm'

const MAX_SIZE = 2000

class DisagreementModal extends Component {
  state = {
    reason: ''
  }

  onChangeHandler = event => {
    this.setState({
      reason: event.target.value
    })
  }

  onAddDisagreement = () => {
    const {pts, collabId, performerId, editPts} = this.props 
    const { reason } = this.state
    pts.isValidated = false
    pts.validatedBy = null
    pts.disagreement = {
      comment: reason,
      traited: false,
      creator: collabId
    }
    editPts(performerId, pts)
  }

  renderContent = isTooLong => {
    const {
      loading,
      error,
      success,
      fullScreen,
      onClose,
      resetStatus: onReset
    } = this.props
    const { reason } = this.state

    if (error || success) {
      return (
        <DisagreementNotification
          success={success}
          onClose={onClose}
          onReset={onReset}
        />
      )
    } else if (loading) {
      return (
        <FlexContainer horizontalAlign='center' verticalAlign='middle'>
          <Spinner />
        </FlexContainer>
      )
    }
    return (
      <DisagreementForm
        reason={reason}
        onChange={this.onChangeHandler}
        isTooLong={isTooLong}
        fullScreen={fullScreen}
        onAddDisagreement={this.onAddDisagreement}
        onClose={onClose}
      />
    )
  }

  render () {
    const { open, onClose, fullScreen } = this.props
    const { reason } = this.state
    const isTooLong = MAX_SIZE < reason.length

    return (
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
        <DialogTitle>Emettre un désaccord</DialogTitle>
        {this.renderContent(isTooLong)}
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  loading: get(state, 'validation.loading', false),
  error: get(state, 'validation.error', null),
  success: get(state, 'validation.success', false)
})

const mapDispatchToProps = dispatch => ({
  resetStatus: () => dispatch(resetStatus()),
  editPts : (id, pts) => dispatch(editPts(id, pts))
})
export default connect(mapStateToProps, mapDispatchToProps) (withMobileDialog()(DisagreementModal))
