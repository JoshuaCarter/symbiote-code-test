import React, { Component } from "react";
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem, NavLink, NavbarBrand, Button } from 'reactstrap';
//reducer actions
import auth from "../../reducers/auth";

class NavBar extends Component {

	componentWillMount() {
		this.props.checkAuth();
	}

	render() {
		//render simple navbar
		return (
			<Navbar className="navbar-dark bg-dark" expand={true} dark>
				<NavbarBrand href="/">Symbiote</NavbarBrand>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink href="http://www.joshuacarter.com.au" target="_blank">
							Joshua Carter
						</NavLink>
					</NavItem>
					<NavItem className="ml-2">
						{this.renderLoginBtn()}
					</NavItem>
				</Nav>
			</Navbar>
		);
	}

	renderLoginBtn() {
		//logged in
		if (this.props.authorized) {
			return (
				<Button color="danger" onClick={() => this.onLogout()}>Logout</Button>
			);
		}
		//logged out
		else {
			return (
				<Button color="primary" onClick={() => this.onLogin()}>Login</Button>
			);
		}
	}

	onLogin() {
		this.props.openModal();
	}

	onLogout() {
		this.props.logout();
	}
}

const mapStateToProps = function (store) {
	return {
		//react_prop: store.sub_store.prop
		authorized: store.auth.authorized
	};
}

const mapDispatchToProps = function (dispatch) {
	return {
		//react_prop: (param) => { dispatch(redux_action(param)) }
		openModal: () => { dispatch(auth.openModal()) },
		logout: () => { dispatch(auth.logout()) },
		checkAuth: () => { dispatch(auth.checkAuth()) },
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);