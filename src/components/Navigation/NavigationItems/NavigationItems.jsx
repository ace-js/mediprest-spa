import React from 'react'
import { withRouter } from 'react-router-dom'
import { isNull, includes } from 'lodash'
import { MenuItem } from 'material-ui'
import {Badge} from '@material-ui/core'
import {HistoryRounded, AssignmentTurnedIn, Build, Message, Lock} from '@material-ui/icons'


import './NavigationItems.css'
import { constants } from '../../../shared'

const navigationItems = (props) => {
  const activeStyle = {
    textAlign: 'left',
    backgroundColor: '#ccc'
  }
  const style = {
    textAlign: 'left'
  }

  let menuError = (
    <div
      onClick={props.clicked}
      style={{ boxShadow: '0 2px 3px #ccc', border: '1px #eee solid', textAlign: 'center' }}
    >
      <Lock color='error' style={{ marginTop: '10px' }} />
      <p>Veuillez vous authentifier afin de pouvoir avoir accès aux fonctionnalités du site</p>
    </div>
  )
  let menuItems = []
  if (props.isAuthenticated && !isNull(props.roles)) {
    if (includes(props.roles, 'Billing')) {
      menuItems = [
        { name: 'Facturation', pathname: constants.FACTURATION_VALIDATION_URL, icon: <AssignmentTurnedIn color='inherit' /> },
        { name: 'Historique', pathname: constants.FACTURATION_HISTORIC_URL, icon: <HistoryRounded color='inherit' /> },
        { name: 'Messages', pathname: constants.MESSAGES_URL, icon: <Badge color='secondary' badgeContent={props.unreadAmount}><Message color='inherit' /> </Badge>}
      ]
    } else {
      if (props.activeInami) {
        menuItems = [
          { name: 'Validation', pathname: constants.VALIDATION_URL, icon: <AssignmentTurnedIn color='inherit' /> },
          { name: 'Historique', pathname: constants.HISTORIC_URL, icon: <HistoryRounded color='inherit' /> },
          { name: 'Messages', pathname: constants.MESSAGES_URL, icon: <Badge color='secondary' badgeContent={props.unreadAmount}><Message color='inherit' /> </Badge>}
        ]
        if (props.inami === props.activeInami) {
          menuItems.push({ name: 'Administration', pathname: constants.ADMIN_URL, icon: <Build color='inherit' /> })
        }
      }
    }
  }
  return props.isAuthenticated ? (
    <div onClick={props.clicked}>
      {menuItems.map((item, index) => {
        if (item.icon) {
          return (
            <MenuItem
              key={index}
              onClick={() => props.onLinkClick(item.pathname)}
              leftIcon={item.icon}
              style={props.location.pathname === item.pathname ? activeStyle : style}
            >
              {item.name}
            </MenuItem>
          )
        } else {
          return (
            <MenuItem
              key={index}
              onClick={() => props.onLinkClick(item.pathname)}
              style={props.location.pathname === item.pathname ? activeStyle : style}
            >
              {item.name}
            </MenuItem>
          )
        }
      })}
    </div>
  ) : (
    menuError
  )
}

export default withRouter(navigationItems)
