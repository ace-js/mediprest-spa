import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'
import DatePicker from 'material-ui/DatePicker'
import { noop } from 'lodash'
import areIntlLocalesSupported from 'intl-locales-supported'

import { Block, FlexContainer } from './../UI/Layout'
import { H4 } from './../UI/Text'
import { constants } from './../../shared'

const styles = (theme) => ({
  formControl: {
    minWidth: '100%',
    marginHorizontal: '1rem',
    [theme.breakpoints.up('md')]: {
      minWidth: '12rem',
      marginRight: '1rem'
    }
  },
  select: {
    width: '100%',
    marginTop: '2rem',
    marginRight: 5
  },
  datepicker: {
    marginTop: '0.5rem',
    marginRight: 5,
    color: 'black'
  }
})

let DateTimeFormat
if (areIntlLocalesSupported(['fr', 'en'])) {
  DateTimeFormat = global.Intl.DateTimeFormat
}else {
  const IntlPolyfill = require('intl')
  DateTimeFormat = IntlPolyfill.DateTimeFormat
  require('intl/locale-data/jsonp/fr')
}

const renderSecondField = (
  contextType,
  onSelectToggle,
  classes,
  statusIsOpen,
  onChange,
  status,
  dateStart,
  dateEnd
) => {
  switch (contextType) {
    case constants.CONTEXT.VALIDATION:
      return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='status'>Status</InputLabel>
          <Select
            className={classes.select}
            open={statusIsOpen}
            onOpen={() => onSelectToggle('status', true)}
            onClose={() => onSelectToggle('status', false)}
            onChange={(event) => onChange('status', event.target.value)}
            value={status}
            inputProps={{ id: 'status' }}>
            <MenuItem value='none'>Tout</MenuItem>
            <MenuItem value={'V'}>Validé</MenuItem>
            <MenuItem value={'D'}>Avec Désaccord</MenuItem>
            <MenuItem value={'NT'}>Non Traité</MenuItem>
          </Select>
        </FormControl>
      )
    case constants.CONTEXT.HISTORIC:
      return (
        <Fragment>
          <DatePicker
            DateTimeFormat={DateTimeFormat}
            className={classes.datepicker}
            hintText='Date de début'
            maxDate={dateEnd ? new Date(dateEnd) : new Date()}
            onChange={(a, b) => onChange('dateStart', b)}
            okLabel='OK'
            cancelLabel='Annuler'
          />
          <DatePicker
            DateTimeFormat={DateTimeFormat}
            className={classes.datepicker}
            hintText='Date de fin'
            minDate={dateStart && new Date(dateStart)}
            maxDate={new Date()}
            onChange={(a, b) => onChange('dateEnd', b)}
            okLabel='OK'
            cancelLabel='Annuler'
          />
        </Fragment>
      )
    case constants.CONTEXT.FACTURATION:
      return (
        <Fragment>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='status'>Status</InputLabel>
            <Select
              className={classes.select}
              open={statusIsOpen}
              onOpen={() => onSelectToggle('status', true)}
              onClose={() => onSelectToggle('status', false)}
              onChange={(event) => onChange('status', event.target.value)}
              value={status}
              inputProps={{ id: 'status' }}>
              <MenuItem value='T'>Tout</MenuItem>
              <MenuItem value={'V'}> à facturer</MenuItem>
              <MenuItem value={'DNT'}>Désaccords non traité</MenuItem>
              <MenuItem value={'DHBM'}>Mes désaccords encours</MenuItem>
            </Select>
          </FormControl>
        </Fragment>
      )
    default:
      return null
  }
}

const PtsFilterForm = ({
  classes,
  contactType,
  status,
  onChange,
  contactTypeIsOpen,
  statusIsOpen,
  onSelectToggle,
  contextType,
  dateStart,
  dateEnd
}) => {
  return (
    <Block
      borderColor={'BlueDawn'}
      bgColor={'GreyWhite'}
      border={'0.1rem solid'}
      radius={'0.5rem'}
      paddingVertical={'xs'}
      paddingHorizontal={'sm'}>
      <H4 size={'1.4rem'} marginBottom={'xs'}>
        {' '}
        Filtres{' '}
      </H4>
      <FlexContainer className={'responsive'} horizontalAlign={'between'}>
        <FlexContainer className={'responsive'} width={'80%'}>
          <Block>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='contact-type'>Type de contact</InputLabel>
              <Select
                className={classes.select}
                onOpen={() => onSelectToggle('contactType', true)}
                onClose={() => onSelectToggle('contactType', false)}
                open={contactTypeIsOpen}
                inputProps={{ id: 'contact-type' }}
                value={contactType}
                onChange={(event) =>
                  onChange('contactType', event.target.value)
                }>
                <MenuItem value='none'>Tout</MenuItem>
                <MenuItem value={'H'}>Hospitalisation</MenuItem>
                <MenuItem value={'A'}>Ambulatoire</MenuItem>
              </Select>
            </FormControl>
          </Block>
          {renderSecondField(
            contextType,
            onSelectToggle,
            classes,
            statusIsOpen,
            onChange,
            status,
            dateStart,
            dateEnd
          )}
        </FlexContainer>
        <FlexContainer
          width={'20%'}
          className={'responsive'}
          verticalAlign={'middle'}
          horizontalAlign={'right'}>
          <Button variant='contained' color='secondary' href={'pdf'}>
            Export PDF
          </Button>
        </FlexContainer>
      </FlexContainer>
    </Block>
  )
}

PtsFilterForm.propTypes = {
  classes: PropTypes.object,
  contactType: PropTypes.string,
  status: PropTypes.string,
  onChange: PropTypes.func,
  contactTypeIsOpen: PropTypes.bool,
  statusIsOpen: PropTypes.bool,
  onSelectToggle: PropTypes.func,
  contextType: PropTypes.string
}
PtsFilterForm.defaultProps = {
  onChange: noop,
  onSelectToggle: noop
}

export default withStyles(styles)(PtsFilterForm)
