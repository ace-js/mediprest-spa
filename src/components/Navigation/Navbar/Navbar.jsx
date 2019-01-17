import React, { Fragment } from 'react'
import * as colors from 'material-ui/styles/colors'
import { IconButton, IconMenu, MenuItem, Divider, AppBar, FlatButton } from 'material-ui'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'

import { constants } from '../../../shared'

const Navbar = (props) => {
  let rigthBtn = <FlatButton label='Connexion' onClick={() => props.onLinkClick(constants.AUTH_URL)} />
  if (props.isAuthenticated) {
    rigthBtn = (
      <IconMenu
        onClick={() => props.clicked(constants.ICON_MENU)}
        open={props.open}
        iconButtonElement={
          <IconButton>
            {' '}
            <AccountIcon />{' '}
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {props.isDelegate ? (
          <Fragment>
            <MenuItem onClick={() => props.onLinkClick(constants.CONNECTION_AS_URL)}>
              {' '}
              Choix d'un prestataire
            </MenuItem>
            <Divider />
          </Fragment>
        ) : null}
        <MenuItem onClick={() => props.onLinkClick(constants.LOGOUT_URL)}>Déconnexion</MenuItem>
      </IconMenu>
    )
  }
  const titelStyle = {
    cursor: 'pointer',
    textAlign: 'left',
    maxWidth: '200px'
  }

  return (
    <AppBar
      onTitleClick={() => props.onLinkClick(constants.HOME_URL)}
      onLeftIconButtonClick={() => props.clicked(constants.SIDE_DRAWER)}
      titleStyle={titelStyle}
      title='Mediprest'
      iconElementRight={rigthBtn}
      style={{ backgroundColor: colors.blue500 }}
    />
  )
}

export default Navbar
