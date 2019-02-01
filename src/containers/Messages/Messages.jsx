import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, isEmpty } from 'lodash'

import {
  Container,
  FlexContainer,
  Grid,
  Block
} from './../../components/UI/Layout'
import { H2 } from './../../components/UI/Text'
import MessageItem from './components/MessageItem'
import { fetchMessages, setActiveMessage, updateActiveMessage } from './../../store/actions'
import ChatBox from './components/Chatbox'

class Messages extends Component {
  state = {
    content: ''
  }
  componentDidMount = () => {
    const { collabId, fetchMessages } = this.props
    fetchMessages(collabId)
  }

  onSelectHandler = (id) => {
    const index = this.props.messages.findIndex((message) => message.id === id)
    //si dernier message === unread et recipient === colab mark as read
    this.props.setActiveMessage({ ...this.props.messages[index] })
  }

  onChangeHandler = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  componentDidUpdate = (prevProps) => {
    const { activeMessage : prevActive } = prevProps
    const { activeMessage, collabId, updateActiveMessage  } = this.props
    const predicateCondition = item => item.recipient === collabId && !item.isRead

     if(prevActive.id !== activeMessage.id && !isEmpty(activeMessage.items)) {
       const lastMessage = activeMessage.items[activeMessage.items.length - 1]
       if(predicateCondition(lastMessage)){
         const message = {
           ...activeMessage,
           items: activeMessage.items.map(item => {
             if(predicateCondition(item)){
               return {
                 ...item,
                 isRead: true,
                 readDate: new Date()
               }
             } else {
               return item
             }
           })
         }
        updateActiveMessage(message, collabId)
       }
     }
  }

  onSendHandler = () => {
    const { content } = this.state
    const { collabId, activeMessage, updateActiveMessage } = this.props
    const [sender, recipient] = collabId === activeMessage.actor1 ? [collabId, activeMessage.actor2] : [collabId, activeMessage.actor1]
    const message = {
      sendDate: new Date(),
      isRead: false,
      content,
      sender,
      recipient,
      readDate: null
    }
   
    const payload = {
      ...activeMessage,
      items: [...activeMessage.items, message]
    }

    this.setState({
      content: ''    
    }, () => updateActiveMessage(payload, collabId))
  }

  renderMessages = () => {
    const { messages, collabId, activeMessage } = this.props

    return messages.map((message, index) => {
      const item = !isEmpty(message.items) ? message.items[message.items.length -1] : {}
      return (
        <MessageItem
          key={`message_${index}`}
          label={item.content}
          id={message.id}
          unread={!item.isRead && item.recipient === collabId}
          active={message.id === activeMessage.id}
          onSelect={this.onSelectHandler}
        />
      )
    })
  }

  render() {
    const { collabId, activeMessage } = this.props
    const { content } = this.state

    return (
      <Container>
        <H2>Messagerie</H2>
        <Grid
          templateRMobile='20rem 1fr'
          templateAMobile={`".Items .Items" ".Chatbox .Chatbox"`}
          templateCDesktop='1fr 2fr'
          templateRDesktop='1fr'
          templateADesktop={`".Items .Chatbox"`}>
          <Block className='Items'>{this.renderMessages()}</Block>
          <ChatBox
            message={activeMessage}
            collabId={collabId}
            onChange={this.onChangeHandler}
            content={content}
            onSend={this.onSendHandler}
          />
        </Grid>
      </Container>
    )
  }
}

const mapDisptachToProps = (dispatch) => ({
  fetchMessages: (collabId) => dispatch(fetchMessages(collabId)),
  setActiveMessage: (message) => dispatch(setActiveMessage(message)),
  updateActiveMessage: (message, collabId) => dispatch(updateActiveMessage(message, collabId))
})

const mapStateToProps = (state) => ({
  collabId: get(
    state,
    'connectionAs.currentPerformer._id',
    get(state, 'auth.collaborator._id')
  ),
  messages: get(state, 'messages.messages', []),
  activeMessage: get(state, 'messages.activeMessage', {})
})

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Messages)
