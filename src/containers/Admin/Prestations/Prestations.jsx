import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { get, isEmpty, isEqual } from 'lodash'

import Table from '../components/Table'
import { Block, FlexContainer } from '../../../components/UI/Layout'
import {
  initAdmin,
  updateAdminPrest,
  resetAdminPrestStatus,
  resetUpdateAdminPrest,
  saveUpdateAdminPrest
} from '../../../store/actions'
import SnackBarNotification from '../../../components/UI/Notifications/SnackBarNotification'

class Delegations extends Component {
  state = {
    filter: ''
  }

  componentDidMount = () => {
    const {
      performer: { inami },
      init
    } = this.props
    init(inami)
  }

  onCheckHandler = (id) => {
    const { prestations, updatePrestations } = this.props
    const index = prestations.findIndex((prestation) => prestation._id === id)
     prestations[index].isFavorite = !prestations[index].isFavorite

     updatePrestations(prestations)
  }

  onFilterChange = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  renderActions = () => {
    const {
      prestations,
      prestationsBase,
      cancelUpdates,
      saveUpdates,
      performer: { inami, _id }
    } = this.props
    return isEqual(prestations, prestationsBase) ? null : (
      <FlexContainer marginTop='sm' horizontalAlign='center'>
        <Block>
          <Button
            variant='contained'
            color='primary'
            onClick={() => saveUpdates(inami, _id, prestations)}>
            Valider
          </Button>
        </Block>
        <Block marginLeft='xs'>
          <Button variant='contained' color='secondary' onClick={cancelUpdates}>
            Annuler
          </Button>
        </Block>
      </FlexContainer>
    )
  }

  render() {
    const { prestations, failed, success, resetStatus } = this.props
    const { filter } = this.state

    const predicate = (value, filter) =>
      value.toLowerCase().includes(filter.toLowerCase())

    let prestationsFiltered = !isEmpty(filter)
      ? prestations.filter(
          (presta) =>
            predicate(presta.label, filter) || predicate(presta._id, filter)
        )
      : prestations

    return (
      <Block paddingTop='sm' paddingBottom='sm'>
        <TextField
          label='Filtrer'
          style={{ width: '400px', marginBottom: '30px' }}
          placeholder='nom, prénom ou service'
          value={filter}
          onChange={this.onFilterChange}
          variant='outlined'
        />
        <Block overflowY='scroll' maxHeight='350px'>
          <Table
            headers={['Actif', 'Code préstation', 'Libellé', 'Nb prestée']}
            context='PRESTATIONS'
            onCheck={this.onCheckHandler}
            items={prestationsFiltered}
          />
        </Block>
        {this.renderActions()}
        {(success || failed) && (
          <SnackBarNotification
            open={true}
            success={success}
            onClose={resetStatus}
          />
        )}
      </Block>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  init: (inami) => dispatch(initAdmin(inami)),
  cancelUpdates: () => dispatch(resetUpdateAdminPrest()),
  updatePrestations: (prestations) => dispatch(updateAdminPrest(prestations)),
  saveUpdates: (inami, id, delegates) => dispatch(saveUpdateAdminPrest(inami, id, delegates)),
  resetStatus: () => dispatch(resetAdminPrestStatus())
})
const mapStateToProps = (state) => ({
  performer: get(state, 'connectionAs.currentPerformer', {}),
  prestations: get(state, 'prestations.prestationsAdmin', []),
  prestationsBase: get(state, 'prestations.prestationsBaseAdmin', []),
  failed: get(state, 'prestations.updateError', false),
  success: get(state, 'prestations.updateSuccess', false)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delegations)
