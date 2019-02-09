import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { get, isEmpty, isEqual } from 'lodash'

import Table from '../components/Table'
import { Block, FlexContainer } from '../../../components/UI/Layout'
import {
  initDelegations,
  updateDelegates,
  cancelUpdates,
  saveUpdates,
  resetStatusDelegations
} from '../../../store/actions'
import SnackBarNotification from '../../../components/UI/Notifications/SnackBarNotification';

class Delegations extends Component {
  state = {
    filter: ''
  }

  componentDidMount = () => {
    const {
      performer: { _id, inami },
      init
    } = this.props
    init(inami, _id)
  }

  onCheckHandler = (id) => {
    const { delegates, updateDelegates } = this.props
    const index = delegates.findIndex((delegate) => delegate === id)
    const delegatesUpdated =
      index === -1
        ? [...delegates, id]
        : delegates.filter((item) => item !== id)
    updateDelegates(delegatesUpdated)
  }

  onFilterChange = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  renderActions = () => {
    const {
      delegates,
      delegatesBase,
      cancelUpdates,
      saveUpdates,
      performer: { inami }
    } = this.props
    return isEqual(delegates, delegatesBase) ? null : (
      <FlexContainer marginTop='sm' horizontalAlign='center'>
        <Block>
          <Button
            variant='contained'
            color='primary'
            onClick={() => saveUpdates(inami, delegates)}>
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
    const { collaborators, delegates, failed, success, resetStatus } = this.props
    const { filter } = this.state

    
    const predicate = (value, filter) =>
      value.toLowerCase().includes(filter.toLowerCase())

    const collabsFiltered = !isEmpty(filter)
      ? collaborators.filter(
          (collab) =>
            predicate(collab.name, filter) ||
            predicate(collab.firstname, filter) ||
            predicate(collab.department.name, filter)
        )
      : collaborators

    return (
      <Block paddingTop='sm'>
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
            headers={['Actif', 'Prénom', 'Nom', 'Service']}
            context='DELEGATIONS'
            onCheck={this.onCheckHandler}
            items={collabsFiltered}
            activeItems={delegates}
          />
        </Block>
        {this.renderActions()}
       { (success || failed) && <SnackBarNotification
        open={true}
        success={success}
        onClose={resetStatus}
        />}
      </Block>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  init: (inami, id) => dispatch(initDelegations(inami, id)),
  cancelUpdates: () => dispatch(cancelUpdates()),
  updateDelegates: (delegates) => dispatch(updateDelegates(delegates)),
  saveUpdates: (inami, delegates) => dispatch(saveUpdates(inami, delegates)),
  resetStatus: () => dispatch(resetStatusDelegations())
})
const mapStateToProps = (state) => ({
  performer: get(state, 'connectionAs.currentPerformer', {}),
  collaborators: get(state, 'delegations.collaborators', []),
  delegates: get(state, 'delegations.delegates', []),
  delegatesBase: get(state, 'delegations.delegatesBase', []),
  failed: get(state, 'delegations.error', false),
  success: get(state, 'delegations.success', false)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delegations)
