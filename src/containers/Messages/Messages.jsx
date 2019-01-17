import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Container,
  FlexContainer,
  Grid,
  Block
} from './../../components/UI/Layout'
import { H2 } from './../../components/UI/Text'
import MessageItem from './components/MessageItem';

class Messages extends Component {
  componentDidMount = () => {}

  onSelectHandler = (id) => {
    console.log('on select ' , id)
  }

  render() {
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
           <MessageItem unread active onSelect={this.onSelectHandler}/>
           <MessageItem unread onSelect={this.onSelectHandler}/>
           <MessageItem  onSelect={this.onSelectHandler}/>
          </Block>
          <Block className='Chatbox' bgColor='Orange'>
            Chatbox
          </Block>
        </Grid>
      </Container>
    )
  }
}

export default Messages
