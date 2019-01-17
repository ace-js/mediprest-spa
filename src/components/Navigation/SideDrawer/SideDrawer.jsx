import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Drawer } from 'material-ui'
import AppBar from 'material-ui/AppBar/AppBar'
import * as colors from 'material-ui/styles/colors'
import Backdrop from '../../UI/Backdrop/Backdrop'

import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'
import { constants } from '../../../shared'

const sideDrawer = (props) => {
  return (

    <Fragment>
      <Backdrop show={props.open} onClick={() => props.clicked(constants.SIDE_DRAWER)} />
      <Drawer open={props.open}>
        <AppBar
          title='Mediprest'
          titleStyle={{ textAlign: 'left', maxWidth: '200px' }}
          iconStyleLeft={{ visibility: 'hidden' }}
          iconElementLeft={null}
          style={{ backgroundColor: colors.blue500 }} />
        <NavigationItems
          onLinkClick={props.onLinkClick}
          clicked={props.clicked}
          isAuthenticated={props.isAuthenticated}
          roles={props.roles}
          inami={props.inami}
          unreadAmount={props.unreadAmount}
          activeInami={props.activeInami} />
      </Drawer>
    </Fragment>
  )
}

export default withRouter(sideDrawer)
