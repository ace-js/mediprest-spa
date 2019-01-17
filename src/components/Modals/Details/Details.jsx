import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Dialog,
  Typography,
  colors,
  withMobileDialog
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

import { Grid } from './../../UI/Layout'

import PatientDetail from './PatientDetail'
import PtsDetail from './PtsDetail'
const styles = {
  appBar: {
    position: 'relative',
    backgroundColor: colors.blue[500]
  },
  patient: {
    avatar: {
      small: {
        height: '10rem',
        width: '10rem'
      },
      big: {
        height: '15rem',
        width: '15rem'
      }
    }
  }
}
const Transition = props => <Slide direction='up' {...props} />

const Details = ({ pts, onClose, fullScreen }) => (
  <Dialog open onClose={onClose} fullScreen TransitionComponent={Transition}>
    <AppBar style={styles.appBar}>
      <Toolbar>
        <IconButton color='inherit' onClick={onClose} aria-label='Close'>
          <Close />
        </IconButton>
        <Typography variant='title' color='inherit' style={{ flex: 1 }}>
          Details
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid
      templateRMobile='calc(100vh - 66px) 1fr'
      templateAMobile={` ".Patient .Patient" ".Pts .Pts" `}
      templateCDesktop='1fr 2fr'
      templateRDesktop='1fr'
      templateADesktop={`".Patien .Pts"`}>
      <PatientDetail
        patient={pts.patient}
        fullScreen={fullScreen}
        styles={styles.patient}
      />
      <PtsDetail mobile={fullScreen} pts={pts} />
    </Grid>
  </Dialog>
)

export default withMobileDialog()(Details)
