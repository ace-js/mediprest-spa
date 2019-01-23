import React from 'react'
import { isEmpty } from 'lodash'
import uuid from 'uuid'

import { Block } from '../../../components/UI/Layout'

const ChatBox = ({ collabId, messages }) => {
  return (
    <Block>
      {!isEmpty(messages) ? (
        messages.map((item) => <p key={uuid.v1()}>{item.content}</p>)
      ) : (
        <p>Veuillez selectionner une conversation</p>
      )}
    </Block>
  )
}

ChatBox.defaultProps = {
  messages: []
}

export default ChatBox
