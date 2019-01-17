import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import {
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  DialogContent
} from '@material-ui/core'

import { FlexContainer } from './../../UI/Layout'

const MAX_SIZE = 2000

const DisagreementForm = ({
  reason,
  onChange,
  onAddDisagreement,
  onClose,
  isTooLong,
  fullScreen
}) => {
  return (
    <Fragment>
      <DialogContent>
        <FlexContainer
          minWidth={fullScreen ? 'auto' : '30rem'}
          direction={'column'}
          horizontalAlign='between'
          verticalAlign={'top'}
        >
          <DialogContentText>Raison du désaccord</DialogContentText>
          <TextField
            style={{ width: '100%' }}
            multiline
            rowsMax='8'
            onChange={onChange}
            value={reason}
            variant='outlined'
          />
          <DialogContentText style={{ color: isTooLong ? 'red' : '' }}>
            {isTooLong
              ? 'Longueur maximal autorisée dépassée'
              : `${MAX_SIZE - reason.length} caractère(s) restant`}
          </DialogContentText>
        </FlexContainer>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='primary'
          disabled={isEmpty(reason) || isTooLong}
          onClick={onAddDisagreement}
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
      </DialogActions>
    </Fragment>
  )
}

DisagreementForm.propTypes = {
  reason: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isTooLong: PropTypes.bool
}

export default DisagreementForm
