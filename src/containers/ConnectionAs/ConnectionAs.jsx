import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isEmpty, isNull, pick } from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchPerformers, initSetChoice, removeError } from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'
import Dialog from '../../components/UI/Dialog/Dialog'
import PerformersArray from '../../components/Arrays/PerformersArray/PerformersArray'
import './ConnectionAs.css'
import H2 from '../../components/UI/Text/H2'

class ConnectionAs extends Component {
  state = {
    selectedIndex: -1,
    hasAuthError: false
  }

  componentDidMount () {
    this.props.onFetchPerformers(this.props.collaborator._id)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentPerformer && this.props.currentPerformer !== nextProps.currentPerformer) {
      this.props.history.push('/validation')
    }
  }

  onSelect = (index) => {
    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex === index ? -1 : index
    }))
  }

  onSelectMySelf = () => {
    const {collaborator, onSetChoice} = this.props
    onSetChoice(pick(collaborator, ['_id', 'firstname', 'name', 'inami']))
  }

  onConnectionAs = () => {
    const {performers, onSetChoice} = this.props, {selectedIndex} = this.state
    const performer = performers[selectedIndex]
    onSetChoice(performer)
  }

  onChangePage = (e, page) => {
    console.log(page)
  }

  onChangeRowsPerPage = (e) => {
    console.log(e.target.value)
  }

  onCloseHandler = () => {
    this.props.onRemoveError()
  }

  renderContent = () => {
    const {selectedIndex} = this.state
    const {loading, performers} = this.props

    if (loading) {
      return <Spinner/>
    } else if (!isEmpty(performers)) {
      return (<PerformersArray
        changePage={this.onChangePage}
        changeRowsPerPage={this.onChangeRowsPerPage}
        selectedIndex={selectedIndex}
        performers={performers}
        onSelect={this.onSelect}/>)
    }
    return null
  }

  render () {
    const {collaborator, error} = this.props

    const buttons = [
      {label: 'Ok', onSelect: () => console.log('Ok')},
      {label: 'Recommence', onSelect: () => console.log('Recommencer'), primary: true}]

    return (
      <div className='ConnectionAs'>
        <div>
          <H2>Choix d'un prestataire</H2>
          <div className='Button-Group'>
            {!isNull(collaborator.inami) && (
              <RaisedButton
                label='Vers ma session'
                secondary
                onClick={this.onSelectMySelf}/>
            )}
            <RaisedButton
              label='Selectionner'
              primary
              disabled={this.state.selectedIndex < 0}
              onClick={this.onConnectionAs}/>
          </div>
        </div>
        {this.renderContent()}
        {error &&
        (<Dialog
          buttons={buttons}
          title='Erreur'
          isOpen={!isNull(error)}
          closed={this.onCloseHandler}>
          {error}
        </Dialog>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    collaborator: state.auth.collaborator,
    performers: state.connectionAs.performers,
    loading: state.connectionAs.loading,
    error: state.connectionAs.error,
    currentPerformer: state.connectionAs.currentPerformer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPerformers: collaboratorId => dispatch(fetchPerformers(collaboratorId)),
    onSetChoice: performer => dispatch(initSetChoice(performer)),
    onRemoveError: dispatch(removeError())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConnectionAs))
