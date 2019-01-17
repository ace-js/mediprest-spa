import React from 'react'
import PropTypes from 'prop-types'
import { findIndex } from 'lodash'

import MessageItem from './MessageItem'

const MessageItems = ({ pts, onSelect, activeItem, collabId }) =>
  pts.map((item) => {
    const isUnread =
      findIndex(
        item.disagreement.messages,
        (message) => !message.isRead && message.recipient === collabId
      ) !== -1
    const isActive = item._id === activeItem
    return <MessageItem unread={isUnread} active={isActive} />
  })

MessageItems.propTypes = {
  pts: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  activeItem: PropTypes.string
}

MessageItems.defaultProps = {
  pts: []
}
export default MessageItems
