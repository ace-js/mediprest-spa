import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { DialogContentText } from '@material-ui/core'
import { ErrorOutlineRounded, CheckCircleRounded } from '@material-ui/icons'

import { FlexContainer } from './../../UI/Layout'

const renderContent = success => {
  return success
    ? <DialogContentText style={{ fontSize: '1.3rem', textAlign: 'center' }}>
        Ajout de la prestation effectué avec succès
    </DialogContentText>
    : <Fragment>
      <DialogContentText style={{ fontSize: '1.3rem', textAlign: 'center' }}>
          Une erreur est survenue durant l'ajout de la prestation, veuillez réssayer ultérieurment.
      </DialogContentText>
      <DialogContentText style={{ fontSize: '1.3rem', textAlign: 'center' }}>
          Si cela perciste veuillez contacter le helpdesk
      </DialogContentText>
    </Fragment>
}

const AddPtsNotification = ({ success }) => (
  <FlexContainer
    verticalAlign='middle'
    horizontalAlign='center'
    direction='column'
  >
    {success
      ? <CheckCircleRounded style={{ fontSize: '2.6rem', color: '#77d698' }} />
      : <ErrorOutlineRounded style={{ fontSize: '2.6rem' }} color='error' />}
    {renderContent(success)}
  </FlexContainer>
)

AddPtsNotification.propTypes = {
  success: PropTypes.bool
}

export default AddPtsNotification
