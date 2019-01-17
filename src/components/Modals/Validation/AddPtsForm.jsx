import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import {
  DialogContentText,
  Select,
  FormControlLabel,
  MenuItem,
  Switch
} from '@material-ui/core'

import { FlexContainer } from './../../UI/Layout'

const AddPtsForm = ({
  onSelectToggle,
  onSelectChange,
  selectOpen,
  pts,
  currentPrestation,
  prestations,
  selectClass,
  fullScreen,
  onlyFav,
  onSwitchToggle
}) => (
  <Fragment>
    <FlexContainer
      direction={fullScreen ? 'column' : 'row'}
      horizontalAlign='between'
      verticalAlign={fullScreen ? 'top' : 'middle'}
    >
      <DialogContentText style={{ fontWeight: 'bold' }}>
        Contact
      </DialogContentText>
      <DialogContentText style={{ overflow: 'wrapp' }}>
        {pts.contact}
      </DialogContentText>
    </FlexContainer>
    <FlexContainer
      marginVertical='sm'
      direction={fullScreen ? 'column' : 'row'}
      horizontalAlign='between'
      verticalAlign={fullScreen ? 'top' : 'middle'}
    >
      <DialogContentText style={{ fontWeight: 'bold' }}>
        Patient
      </DialogContentText>
      <DialogContentText
      >{`${pts.patient.firstname} ${pts.patient.name}`}</DialogContentText>
    </FlexContainer>
    <FlexContainer
      direction={fullScreen ? 'column' : 'row'}
      horizontalAlign='between'
      verticalAlign={fullScreen ? 'top' : 'middle'}
    >
      <DialogContentText style={{ fontWeight: 'bold' }}>
        Presatation
      </DialogContentText>
      <FlexContainer>
        <Select
          open={selectOpen}
          className={selectClass}
          onOpen={() => onSelectToggle(true)}
          onClose={() => onSelectToggle(false)}
          onChange={event => onSelectChange(event.target.value)}
          value={currentPrestation}
        >
          {isEmpty(prestations)
            ? <MenuItem value=''>Aucun résultat</MenuItem>
            : prestations.map((presta, index) => (
              <MenuItem key={`select_${index}`} value={presta._id}>
                {presta._id} | {presta.label}{' '}
              </MenuItem>
            ))}
        </Select>
        <FormControlLabel
          control={
            <Switch checked={onlyFav} value={'fav'} onChange={onSwitchToggle} />
          }
          label='Favoris'
        />
      </FlexContainer>
    </FlexContainer>
  </Fragment>
)

AddPtsForm.propTypes = {
  onlyFav: PropTypes.bool,
  onSwitchToggle: PropTypes.func.isRequired,
  prestations: PropTypes.array,
  currentPrestation: PropTypes.string,
  onSelectChange: PropTypes.func.isRequired,
  onSelectToggle: PropTypes.func.isRequired,
  pts: PropTypes.object.isRequired
}

export default AddPtsForm
