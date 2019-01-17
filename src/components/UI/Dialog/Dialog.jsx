import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'

const dialog = props => {
  const actions = props.buttons.map((button, index) => <FlatButton key={index} {...button} />)

  return (
    <Dialog
      actions={actions}
      modal={props.isModal}
      title={props.title}
      open={props.isOpen}
      onRequestClose={props.closed}
    >
      {props.children}
    </Dialog>
  )
}

dialog.propTypes = {
  buttons: PropTypes.array.isRequired,
  isModal: PropTypes.bool,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  closed: PropTypes.func
}

dialog.defaultProps = {
  isModal: false,
  isOpen: false
}

export default dialog
