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
import { fetchMessages } from './../../store/actions'
import ChatBox from './components/Chatbox';

class Messages extends Component {
  state = {
    activeMessage: {}
  }
  componentDidMount = () => {
    const {collabId, fetchMessages} = this.props
    fetchMessages(collabId)
  }

  onSelectHandler = (id) => {
    const index = this.props.messages.findIndex(message => message.id === id)
    //si dernier message === unread et recipient === colab mark as read
    this.setState({activeMessage: {...this.props.messages[index]}})
  }

  renderMessages = () => {
    const { messages, collabId } = this.props
    const { activeMessage } = this.state

    return messages.map((message, index) =>{
     const item = !isEmpty(message.items) ? message.items[0] : {}
      return (
      <MessageItem
        key={`message_${index}`}
        label={item.content}
        id={message.id}
        unread={!item.read && item.recipient === collabId}
        active={message.id === activeMessage.id}
        onSelect={this.onSelectHandler} />
    )})
  }

  render() {
    const {collabId} = this.props
    const {activeMessage} = this.state

    return (
      <Container>
        <H2>Messagerie</H2>
        <Grid
          templateRMobile='20rem 1fr'
          templateAMobile={`".Items .Items" ".Chatbox .Chatbox"`}
          templateCDesktop='1fr 2fr'
          templateRDesktop='1fr'
          templateADesktop={`".Items .Chatbox"`}>
          <Block className='Items'>
            {this.renderMessages()}
          </Block>
        <ChatBox messages={activeMessage.items} collabId={collabId} />
        </Grid>
      </Container>
    )
  }
}

const mapDisptachToProps = (dispatch) => ({
  fetchMessages: collabId => dispatch(fetchMessages(collabId))
})

const mapStateToProps = (state) => ({
  collabId: get(state, 'connectionAs.currentPerformer._id', get(state, 'auth.collaborator._id')),
  messages: get(state, 'messages.messages', [])
})

export default connect(mapStateToProps, mapDisptachToProps)(Messages)
