import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import {colors, SnackbarContent, Snackbar, IconButton} from '@material-ui/core'

const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
  };

const styles = theme => ({
    success: {
      backgroundColor: colors.green[400],
    },
    error: {
      backgroundColor: colors.red[600]
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  });

const SnakeBarNotification = ({ open, onClose, success, classes }) => {
    const variant = success ? 'success' : 'error'
    const Icon = variantIcon[variant];
    const message = success ? 'Modifications effectuées avec succès.' : 'Une erreur est survenue, veuillez ressayer ultérieurement.'
    return (
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
      >
        <SnackbarContent
            className={classes[variant]}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
        />
        </Snackbar>
    )
}

export default withStyles(styles) (SnakeBarNotification)