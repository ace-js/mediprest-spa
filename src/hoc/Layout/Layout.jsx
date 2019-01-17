import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { includes, noop } from 'lodash'
import { withRouter } from 'react-router-dom'

import { fetchUnreadAmount } from './../../store/actions'
import Navbar from './../../components/Navigation/Navbar/Navbar'
import './Layout.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { constants } from './../../shared'

class Layout extends Component {
  state = {
    open: false,
    openImenu: false
  }

  onToggleHandler = (target) => {
    switch (target) {
      case constants.SIDE_DRAWER:
        this.setState((prevState) => ({
          open: !prevState.open,
          openImenu: false
        }), () => this.getAmount())
        break
      case constants.ICON_MENU:
        this.setState((prevState) => ({
          openImenu: !prevState.openImenu,
          open: false
        }))
        break
      default:
        this.setState({
          open: false,
          openImenu: false
        })
        break
    }
  }

  getAmount = () => {
    const { collabId, fetchAmount } = this.props
    if (collabId) {
      fetchAmount(collabId)
    }
  }

  onLinkClickHandler = (route) => {
    this.setState(
      {
        openImenu: false,
        open: false
      },
      () => this.props.history.push(route)
    )
  }

  render() {
    return (
      <Fragment>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          isDelegate={includes(this.props.roles, 'Delegate')}
          clicked={this.onToggleHandler}
          onLinkClick={this.onLinkClickHandler}
          open={this.state.openImenu}
        />
        <SideDrawer
          open={this.state.open}
          clicked={this.onToggleHandler}
          {...this.props}
          onLinkClick={this.onLinkClickHandler}
        />
        <main
          className='Content'
          onClick={() =>
            this.state.open || this.state.openImenu
              ? this.onToggleHandler()
              : noop
          }>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  unreadAmount: state.messages.unreadAmount
})

const mapDispatchToProps = (dispatch) => ({
  fetchAmount: (collabId) => dispatch(fetchUnreadAmount(collabId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Layout))
