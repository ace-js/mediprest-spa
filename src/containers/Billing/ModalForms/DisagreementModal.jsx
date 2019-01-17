import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  withMobileDialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import {isEmpty} from 'lodash'

import { constants } from '../../../shared'
import DisagreementDetail from '../../../components/Modals/Billing/DisagreementDetail'
import DisagreementForm from '../../../components/Modals/Billing/DisagreementForm'
import { editPtsBilling } from './../../../store/actions'

class DisagreementModal extends Component {
  state = {
    comment: '',
    currentTab: constants.BILLING_DISAGREEMENT_TAB_CONTEXT.DETAIL
  }

  onTabChangeHandler = (e, value) => {
    this.setState({
      currentTab: value
    })
  }

  onHandlingCheckHandler = (e) => {
    const { pts, collabId, editPts } = this.props
    const ptsToUpdate = { ...pts }
    ptsToUpdate.disagreement.handler = e.target.checked ? collabId : null
    editPts(collabId, ptsToUpdate)
  }

  onCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  onSubmitComment = () => {
    const { comment } = this.state
    const { pts, collabId, editPts } = this.props

    if (comment.length >= 1) {
      const ptsToUpdate = { ...pts }
      ptsToUpdate.disagreement.messages.push({
        content: comment,
        sender: collabId,
        recipient: pts.performer.collaborator
      })
      editPts(collabId, ptsToUpdate)
    }
  }

  onSolvedCheckHandler = (e) => {
    const { pts, collabId, editPts } = this.props
    const ptsToUpdate = { ...pts }
    ptsToUpdate.disagreement.traited = e.target.checked
    editPts(collabId, ptsToUpdate)
  }

  renderContent = () => {
    const { currentTab, comment } = this.state
    const { pts, fullScreen } = this.props

    switch (currentTab) {
      case constants.BILLING_DISAGREEMENT_TAB_CONTEXT.DETAIL:
        return (
          <DisagreementDetail
            disagreement={pts.disagreement}
            mobile={fullScreen}
          />
        )
      case constants.BILLING_DISAGREEMENT_TAB_CONTEXT.HANDLING:
        return (
          <DisagreementForm
            disagreement={pts.disagreement}
            mobile={fullScreen}
            onHandling={this.onHandlingCheckHandler}
            onCommentChange={this.onCommentChange}
            onSubmitComment={this.onSubmitComment}
            onSolved={this.onSolvedCheckHandler}
            comment={comment}
          />
        )
      default:
        return null
    }
  }

  render() {
    const {
      onClose,
      fullScreen,
      pts: { disagreement },
      collabId
    } = this.props
    const { currentTab } = this.state

    if (disagreement === null || disagreement === undefined) return null

    return (
      <Dialog open onClose={onClose} fullScreen={fullScreen}>
        <DialogTitle>Gestion du désaccord</DialogTitle>
        <DialogContent>
          <Tabs
            value={currentTab}
            indicatorColor='primary'
            textColor='primary'
            onChange={this.onTabChangeHandler}>
            <Tab
              label='Details'
              value={constants.BILLING_DISAGREEMENT_TAB_CONTEXT.DETAIL}
            />
            <Tab
              label='Gestion'
              disabled={
                disagreement.handler && disagreement.handler._id !== collabId
              }
              value={constants.BILLING_DISAGREEMENT_TAB_CONTEXT.HANDLING}
            />
          </Tabs>
          {this.renderContent()}
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' onClick={onClose}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

DisagreementModal.propTypes = {
  pts: PropTypes.object.isRequired,
  collabId: PropTypes.string.isRequired,
  editPts: PropTypes.func,
  onClose: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  editPts: (id, pts, isInvoice) => dispatch(editPtsBilling(id, pts, isInvoice))
})

export default connect(
  null,
  mapDispatchToProps
)(withMobileDialog()(DisagreementModal))
