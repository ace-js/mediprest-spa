import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions'

class Logout extends Component {
	componentDidMount = () => {
		this.props.initLogout()
		this.props.history.push('/')
	}
	render() {
		return <div />
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		initLogout: () => dispatch(logout())
	}
}
export default withRouter(connect(null, mapDispatchToProps)(Logout))
