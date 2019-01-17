import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, find, isEmpty, findIndex } from 'lodash'

import {
  fetchPtsHistoric,
  editFilterPropHistoric,
  editMultiFilterPropHistoric
} from '../../store/actions'
import H2 from '../../components/UI/Text/H2'
import PtsArray from '../../components/Arrays/Pts/PtsArray'
import Container from './../../components/UI/Layout/Container'
import { constants } from './../../shared'
import PtsFilterForm from '../../components/Forms/PtsFilterForm'
import Details from '../../components/Modals/Details/Details'

class Historic extends Component {
  state = {
    contactType: {
      open: false
    },
    status: {
      open: false
    },
    modalOpen: false,
    modalContext: null,
    currentPts: null,
    isBilling: false
  }

  componentDidMount = () => {
    const {collaborator:{roles}} = this.props
    this.setState({
      isBilling: (findIndex(roles, role => role === constants.ROLES.BILLING) !== -1)
    }, () => {
      this.generatePts(this.props)
    } )
  }

  componentDidUpdate = (prevProps) => {
    const {
      editFilterProp,
      limit,
      loading,
      total,
      page,
      sortDirection,
      sortBy,
      contactType,
      dateStart,
      dateEnd
    } = this.props
    const {
      limit: prevLimit,
      page: prevPage,
      sortDirection: prevDirection,
      sortBy: prevSort,
      contactType: prevContactType,
      dateStart: prevDateStart,
      dateEnd: prevDateEnd
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
        +dateStart !== +prevDateStart ||
        +dateEnd !== +prevDateEnd
      ) {
        this.generatePts({ ...this.props, page: pageSafe })
      }
    }
  }

  generatePts = (payload) => {
    const {
      onFetchPts,
      currentPerformer,
      collaborator
    } = this.props
    const {isBilling} = this.state
    const id = !isBilling ? currentPerformer.inami : collaborator._id
    const {
      contactType,
      sortBy,
      sortDirection,
      page,
      limit,
      isInvoiced,
      dateStart,
      dateEnd
    } = payload

      onFetchPts(id, {
        contactType,
        sortBy,
        sortDirection,
        page,
        limit,
        isInvoiced,
        dateStart,
        dateEnd
      }, isBilling)
  }

  onShowModal = (id) => {
    this.setState({
      modalOpen: true,
      currentPts: this.getPts(id)
    })
  }

  onCloseModal = () => {
    this.setState({
      modalOpen: false,
      currentPts: null
    })
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

  onSortHandler = (sortSubject) => {
    const { sortBy, sortDirection } = this.props
    const {
      DIRECTION: { ASC, DESC }
    } = constants.FILTER
    const direction =
      sortBy === sortSubject ? (sortDirection === ASC ? DESC : ASC) : ASC
    this.props.editMultiFilterProp([
      { key: 'sortBy', value: sortSubject },
      { key: 'sortDirection', value: direction }
    ])
  }

  onPageChangedHandler = (value) => {
    const { page } = this.props
    if (value !== page) {
      this.props.editFilterProp('page', value)
    }
  }

  onPageSizeChangedHandler = (size) => {
    if (size !== this.props.limit) this.props.editFilterProp('limit', size)
  }

  getPts = (id) => {
    const { pts } = this.props
    return { ...find(pts, (p) => p._id === id) }
  }

  render() {
    const {
      currentPerformer,
      pts,
      contactType,
      page,
      pages,
      sortBy,
      sortDirection,
      limit,
      total,
      dateStart,
      dateEnd
    } = this.props
    const { contactType: contact, currentPts, modalOpen } = this.state
    const pagePaginated = page - 1

    return (
      <Container>
        <H2>
          {!isEmpty(currentPerformer)
            ? `Historique du prestataire de soin : ${
                currentPerformer.firstname
              }, ${currentPerformer.name}`
            : 'Historique de facturation'}
        </H2>
        <PtsFilterForm
          contextType={constants.CONTEXT.HISTORIC}
          contactType={contactType}
          onChange={this.onFilterChange}
          contactTypeIsOpen={contact.open}
          onSelectToggle={this.onFilterToggle}
          dateStart={dateStart}
          dateEnd={dateEnd}
        />
        <PtsArray
          pts={pts}
          onSort={this.onSortHandler}
          sortSubject={sortBy}
          order={sortDirection}
          onValidate={this.onValidateHandler}
          onOpenModal={this.onShowModal}
          contextType={constants.CONTEXT.HISTORIC}
          onChangeRowsPerPage={(event) =>
            this.onPageSizeChangedHandler(event.target.value)
          }
          onPageChange={this.onPageChangedHandler}
          limit={limit}
          page={pagePaginated}
          pages={pages}
          total={total}
        />
        {modalOpen && <Details pts={currentPts} onClose={this.onCloseModal} />}
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentPerformer: get(state, 'connectionAs.currentPerformer', {}),
    collaborator: get(state, 'auth.collaborator', {}),
    ...state.historic
  }
}

const mapDispatchToProps = (dispatch) => ({
  editMultiFilterProp: (filterArray) =>
    dispatch(editMultiFilterPropHistoric(filterArray)),
  onFetchPts: (id, payload, isBilling) =>
    dispatch(fetchPtsHistoric(id, payload, isBilling)),
  editFilterProp: (field, value) =>
    dispatch(editFilterPropHistoric(field, value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Historic)
