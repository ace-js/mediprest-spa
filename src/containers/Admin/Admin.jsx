import React, { Component } from 'react'
import { Tabs, Tab, AppBar } from '@material-ui/core'

import { Container, Block } from './../../components/UI/Layout'
import { H2 } from './../../components/UI/Text'
import Delegations from './Delegations/Delegations'
import Prestations from './Prestations/Prestations'

const DELEGATIONS = 'DELEGATIONS'
const PRESTATIONS = 'PRESTATIONS'

class Admin extends Component {
  state = {
    currentTab: DELEGATIONS
  }

  renderSection = () => {
    const { currentTab } = this.state
    switch (currentTab) {
      case PRESTATIONS:
        return <Prestations />
      case DELEGATIONS:
      default:
        return <Delegations />
    }
  }

  onChangeHandler = (event, value) => {
    console.log('CHANGE : ', value)
    this.setState({ currentTab: value })
  }

  render() {
    const { currentTab } = this.state
    return (
      <Container>
        <H2>Administration</H2>
        <AppBar position='static' color='default'>
          <Tabs value={currentTab} onChange={this.onChangeHandler}>
            <Tab label='Délégations' value={DELEGATIONS} />
            <Tab label='Prestations' value={PRESTATIONS} />
          </Tabs>
        </AppBar>
        <Block>{this.renderSection()}</Block>
      </Container>
    )
  }
}

export default Admin
