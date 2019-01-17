import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, get, omit } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from '@material-ui/core'
import { Autorenew } from '@material-ui/icons'

import {
  fetchPerformerPrestations,
  fetchPrestations,
  resetStatus,
  createPts
} from './../../../store/actions'
import { FlexContainer, Block } from './../../../components/UI/Layout'
import Spinner from './../../../components/UI/Spinner/Spinner'
import AddPtsNotification
  from '../../../components/Modals/Validation/AddPtsNotification'
import AddPtsForm from '../../../components/Modals/Validation/AddPtsForm'

const styles = theme => ({
  select: {
    width: '60%',
    marginLeft: '1rem',
    marginRight: '1rem'
  }
})

class NewPtsModal extends Component {
  state = {
    selectOpen: false,
    prestation: '',
    onlyFav: false
  }
  componentDidMount = () => {
    this.props.fetchPrestations()
  }

  onSelectToggle = open => {
    this.setState({
      selectOpen: open
    })
  }

  onSelectChange = prestation => {
    this.setState({
      prestation
    })
  }

  onAddPrestation = () => {
    const { prestation } = this.state
    const { pts, collabId, performerId } = this.props
    const ptsToSend = {
      ...pts,
      prestation: prestation,
      isValidated: true,
      validatedBy: collabId,
      disagreement: null,
      performer: pts.performer._id
    }
    this.props.createPts(performerId, omit(ptsToSend, ['_id', '__v']))
  }

  onSwitchToggle = () => {
    this.setState(
      prevState => ({
        onlyFav: !prevState.onlyFav
      }),
      () => this.generatePrestations(this.state.onlyFav)
    )
  }

  generatePrestations = onlyFav => {
    const { performerId } = this.props
    onlyFav
      ? this.props.fetchPerformerPrestations(performerId)
      : this.props.fetchPrestations()
  }

  renderContent = () => {
    const {
      classes,
      loading,
      success,
      error,
      prestations,
      pts,
      fullScreen
    } = this.props
    const { prestation, onlyFav, selectOpen } = this.state
    if (error || success) {
      return <AddPtsNotification success={success} />
    } else if (loading) {
      return (
        <FlexContainer horizontalAlign='center' verticalAlign='middle'>
          <Spinner />
        </FlexContainer>
      )
    }
    return (
      <AddPtsForm
        onSelectToggle={this.onSelectToggle}
        onSelectChange={this.onSelectChange}
        pts={pts}
        currentPrestation={prestation}
        prestations={prestations}
        selectClass={classes.select}
        fullScreen={fullScreen}
        onlyFav={onlyFav}
        onSwitchToggle={this.onSwitchToggle}
        selectOpen={selectOpen}
      />
    )
  }

  renderActions = () => {
    const { prestation } = this.state
    const {
      loading,
      success,
      error,
      onClose,
      resetStatus: onReset
    } = this.props

    if (error) {
      return (
        <Fragment>
          <Button color='primary' variant='contained' onClick={onReset}>
            Réessayer <Autorenew />
          </Button>
          <Button color='secondary' variant='contained' onClick={onClose} style={{ marginLeft: '0.5rem' }}>Annuler</Button>
        </Fragment>
      )
    } else if (loading) {
      return null
    } else if (success) {
      return <Button color='secondary' variant='contained' onClick={onClose}>Fermer</Button>
    }
    return (
      <Fragment>
        <Button
          variant='contained'
          color='primary'
          disabled={isEmpty(prestation)}
          onClick={this.onAddPrestation}
        >
          Valider
        </Button>
        <Button
          style={{ marginLeft: '0.5rem' }}
          variant='contained'
          color='secondary'
          onClick={onClose}
        >
          Annuler
        </Button>
      </Fragment>
    )
  }

  render () {
    const { open, onClose, fullScreen } = this.props
    return (
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
        <DialogTitle>Ajouter une prestation</DialogTitle>
        <DialogContent>
          <Block minWidth={fullScreen ? 'auto' : '30rem'}>
            {this.renderContent()}
          </Block>
        </DialogContent>
        <DialogActions>
          {this.renderActions()}
        </DialogActions>
      </Dialog>
    )
  }
}

NewPtsModal.propTypes = {
  collabId: PropTypes.string,
  pts: PropTypes.object,
  open: PropTypes.bool,
  fullScreen: PropTypes.bool,
  performerId: PropTypes.string
}

const mapStateToProps = state => ({
  prestations: get(state, 'prestations.prestations', []),
  loading: get(state, 'validation.loading', false),
  error: get(state, 'validation.error', null),
  success: get(state, 'validation.success', false)
})

const mapDispatchToProps = dispatch => ({
  fetchPerformerPrestations: id =>
    dispatch(fetchPerformerPrestations(id, true)),
  fetchPrestations: () => dispatch(fetchPrestations()),
  resetStatus: () => dispatch(resetStatus()),
  createPts: (id, pts) => dispatch(createPts(id, pts))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(withMobileDialog()(NewPtsModal))
)
