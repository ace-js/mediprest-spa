import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, find } from 'lodash'

import {
  fetchPts,
  editFilterProp,
  editMultiFilterProp,
  editPts,
  resetStatus
} from '../../store/actions'
import H2 from '../../components/UI/Text/H2'
import PtsFilterForm from '../../components/Forms/PtsFilterForm'
import PtsArray from '../../components/Arrays/Pts/PtsArray'
import { constants } from './../../shared'
import Container from './../../components/UI/Layout/Container'
import NewPtsModal from './ModalForms/NewPtsModal'
import DisagreementModal from './ModalForms/DisagreementModal'
import Details from '../../components/Modals/Details/Details'

class Validation extends Component {
  state = {
    contactType: {
      open: false
    },
    status: {
      open: false
    },
    modalOpen: false,
    modalContext: null,
    currentPts: null
  }

  componentDidMount = () => {
    this.generatePts(this.props)
  }

  componentDidUpdate = prevProps => {
    const {
      editFilterProp,
      limit,
      success,
      loading,
      total,
      page,
      sortDirection,
      status,
      sortBy,
      contactType
    } = this.props
    const {
      limit: prevLimit,
      page: prevPage,
      success: prevSuccess,
      sortDirection: prevDirection,
      status: prevStatus,
      sortBy: prevSort,
      contactType: prevContactType
    } = prevProps
    if (!loading) {
      let pageSafe = page
      if (prevLimit !== limit && page > 1) {
        const maxPage = Math.floor(total / limit) + 1
        pageSafe = maxPage < pageSafe ? maxPage : pageSafe
        editFilterProp('page', pageSafe)
      } else if (
        limit !== prevLimit ||
        page !== prevPage ||
        sortDirection !== prevDirection ||
        sortBy !== prevSort ||
        contactType !== prevContactType ||
        status !== prevStatus ||
        (success && !prevSuccess)
      ) {
        this.generatePts({ ...this.props, page: pageSafe })
      }
    }
  }

  generatePts = payload => {
    const { onFetchPts, currentPerformer: { inami } } = this.props
    const {
      contactType,
      status,
      sortBy,
      sortDirection,
      page,
      limit,
      isInvoiced
    } = payload
    onFetchPts(inami, {
      contactType: contactType,
      sortBy: sortBy,
      sortDirection: sortDirection,
      page: page,
      limit: limit,
      status: status,
      isInvoiced: isInvoiced
    })
  }

  onValidateHandler = (e, id) => {
    const { collaborator, currentPerformer } = this.props
    const ptsTarget = this.getPts(id)
    ptsTarget.disagreement = null
    ptsTarget.isValidated = e.target.checked
    ptsTarget.validatedBy = e.target.checked ? collaborator._id : null
    this.props.updatePts(currentPerformer._id, ptsTarget)
  }

  onShowModal = (modalContext, id) => {
    this.setState({
      modalContext: modalContext,
      modalOpen: true,
      currentPts: this.getPts(id)
    })
  }

  onCloseModal = () => {
    this.setState(
      {
        modalContext: null,
        modalOpen: false,
        currentPts: null
      },
      () => this.props.resetStatus()
    )
  }

  onFilterToggle = (key, isOpen) => {
    const newValue = { ...this.state[key] }
    newValue.open = isOpen
    this.setState({
      [key]: newValue
    })
  }

  onFilterChange = (key, value) => {
    this.props.editFilterProp(key, value)
  }

  onSortHandler = sortSubject => {
    const { sortBy, sortDirection } = this.props
    const { DIRECTION: { ASC, DESC } } = constants.FILTER
    const direction = sortBy === sortSubject
      ? sortDirection === ASC ? DESC : ASC
      : ASC
    this.props.editMultiFilterProp([
      { key: 'sortBy', value: sortSubject },
      { key: 'sortDirection', value: direction }
    ])
  }

  onPageChangedHandler = value => {
    const { page } = this.props
    if (value !== page) {
      this.props.editFilterProp('page', value)
    }
  }

  onPageSizeChangedHandler = size => {
    if (size !== this.props.limit) this.props.editFilterProp('limit', size)
  }

  getPts = id => {
    const { pts } = this.props
    return { ...find(pts, p => p._id === id) }
  }

  renderModal = () => {
    const { modalContext, currentPts } = this.state
    const {
      currentPerformer: { _id: performerId },
      collaborator: { _id: collabId }
    } = this.props
    const closeButton = {
      label: 'Fermer',
      primary: false,
      onClick: this.onCloseModal
    }

    switch (modalContext) {
      case constants.MODAL_CONTEXT.DETAIL:
        closeButton.primary = true
        return <Details pts={currentPts} onClose={this.onCloseModal} />
      case constants.MODAL_CONTEXT.ADD_PTS:
        return (
          <NewPtsModal
            collabId={collabId}
            performerId={performerId}
            open
            pts={{ ...currentPts }}
            onClose={this.onCloseModal}
          />
        )
      case constants.MODAL_CONTEXT.DISAGREEMENT:
        return (
          <DisagreementModal
            onClose={this.onCloseModal}
            open
            pts={{ ...currentPts }}
            performerId={performerId}
            collabId={collabId}
          />
        )
      default:
        return null
    }
  }

  render = () => {
    const {
      currentPerformer,
      pts,
      contactType,
      page,
      pages,
      status,
      sortBy,
      sortDirection,
      limit,
      total
    } = this.props
    const { contactType: contact, status: stat, modalOpen } = this.state
    const pagePaginated = page - 1
    return (
      <Container>
        <H2>
          {' '}Validation du prestataire de soin
          : {`${currentPerformer.firstname}, ${currentPerformer.name}`}
        </H2>
        <PtsFilterForm
          contextType={constants.CONTEXT.VALIDATION}
          contactType={contactType}
          status={status}
          onChange={this.onFilterChange}
          contactTypeIsOpen={contact.open}
          statusIsOpen={stat.open}
          onSelectToggle={this.onFilterToggle}
        />
        <PtsArray
          pts={pts}
          onSort={this.onSortHandler}
          sortSubject={sortBy}
          order={sortDirection}
          onValidate={this.onValidateHandler}
          onOpenModal={this.onShowModal}
          contextType={constants.CONTEXT.VALIDATION}
          onChangeRowsPerPage={event =>
            this.onPageSizeChangedHandler(event.target.value)}
          onPageChange={this.onPageChangedHandler}
          limit={limit}
          page={pagePaginated}
          pages={pages}
          total={total}
        />
        {modalOpen && this.renderModal()}
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentPerformer = get(state, 'connectionAs.currentPerformer', {})
  const collaborator = get(state, 'auth.collaborator', {})
  const prestations = get(state, 'prestations.prestations', [])
  return {
    currentPerformer,
    collaborator,
    prestations,
    ...state.validation
  }
}

const mapDispatchToProps = dispatch => ({
  editMultiFilterProp: filterArray =>
    dispatch(editMultiFilterProp(filterArray)),
  onFetchPts: (performerId, payload) =>
    dispatch(fetchPts(performerId, payload)),
  editFilterProp: (field, value) => dispatch(editFilterProp(field, value)),
  updatePts: (id, pts) => dispatch(editPts(id, pts, true)),
  createPts: (id, pts) => dispatch(),
  resetStatus: () => dispatch(resetStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(Validation)
