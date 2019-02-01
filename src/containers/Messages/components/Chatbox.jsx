import React, { Fragment } from 'react'
import { isEmpty } from 'lodash'
import uuid from 'uuid'
import {Send} from '@material-ui/icons/'
import {IconButton} from '@material-ui/core'

import {
  ChatWrapper,
  ChatFooter,
  ChatHeader,
  ChatTitle,
  ChatContent,
  Speech,
  LastSpeechStatus,
  ChatArea,
  ChatButton
} from './StyledItems'

const ChatBox = ({ collabId, message, onChange, content, onSend, id }) => {
  return (
    <ChatWrapper>
      <ChatHeader>
        <ChatTitle>{!isEmpty(message) ? `Contact n°${message.id}` : ''}</ChatTitle>
      </ChatHeader>
      <ChatContent>
        {!isEmpty(message) ? (
          message.items.map((item, index) => (
            <Fragment key={uuid.v1()}>
              <Speech
                className={item.recipient === collabId ? 'left' : 'right'}>
                {item.content}
              </Speech>
              {index + 1 === message.items.length && item.sender === collabId && (
                <LastSpeechStatus className={item.isRead ? 'read' : ''}>
                  {item.isRead
                    ? `Lu ${new Date(
                        item.readDate
                      ).toLocaleDateString()} ${new Date(
                        item.readDate
                      ).toLocaleTimeString()}`
                    : 'Non lu'}
                </LastSpeechStatus>
              )}
            </Fragment>
          ))
        ) : (
          <p>Veuillez selectionner une conversation</p>
        )}
      </ChatContent>
      <ChatFooter>
        <ChatArea onChange={onChange} value={content} disabled={isEmpty(message)} />
       <IconButton disabled={isEmpty(content)} onClick={onSend}>
         <Send />
       </IconButton>
      </ChatFooter>
    </ChatWrapper>
  )
}

ChatBox.defaultProps = {
  message: {}
}

export default ChatBox
