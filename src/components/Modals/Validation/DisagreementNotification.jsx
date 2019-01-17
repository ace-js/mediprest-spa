import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  DialogContentText,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import {
  ErrorOutlineRounded,
  CheckCircleRounded,
  Autorenew
} from '@material-ui/icons'

import { FlexContainer } from './../../UI/Layout'

const renderContent = success => {
  return success
    ? <Fragment>
      <CheckCircleRounded style={{ fontSize: '2.6rem', color: '#77d698' }} />
      <DialogContentText style={{ fontSize: '1.3rem', textAlign: 'center' }}>
          Ajout du désaccord éffectué avec succès
      </DialogContentText>
    </Fragment>
    : <Fragment>
      <ErrorOutlineRounded style={{ fontSize: '2.6rem' }} color='error' />
      <DialogContentText style={{ fontSize: '1.3rem', textAlign: 'center' }}>
          Une erreur est survenue durant l'ajout du désaccord, veuillez réassyer ultérieurment.
      </DialogContentText>
      <DialogContentText style={{ fontSize: '1.3rem', textAlign: 'center' }}>
          Si cela perciste veuillez contacter le helpdesk
      </DialogContentText>
    </Fragment>
}

const renderActions = (success, onClose, onReset) => {
  return success
    ? <Button color='secondary' variant='contained' onClick={onClose}>Fermer</Button>
    : <Fragment>
      <Button color='primary' variant='contained' onClick={onReset}>
          Réessayer
        <Autorenew color='default' />
      </Button>
      <Button color='secondary' variant='contained' onClick={onClose}>Annuler</Button>
    </Fragment>
}
const DisagreementNotification = ({ success, onClose, onReset }) => (
  <Fragment>
    <DialogContent>
      <FlexContainer
        verticalAlign='middle'
        horizontalAlign='center'
        direction='column'
      >
        {renderContent(success)}
      </FlexContainer>
    </DialogContent>
    <DialogActions>
      {renderActions(success, onClose, onReset)}
    </DialogActions>
  </Fragment>
)
DisagreementNotification.propTypes = {
  success: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default DisagreementNotification
