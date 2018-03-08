import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import FA from 'react-fontawesome';
import { Modal, ModalHeader, ModalBody, Button, Form, Input } from 'reactstrap';
//reducer actions
import auth from '../../reducers/auth';
//components
import Loader from '../loader';

class Login extends React.Component {

	username = '';
	password = '';

	render() {
		return (
			<div>
				<Modal
					autoFocus={false}
					isOpen={this.props.modal_open}
					onKeyDown={(e) => this.onSubmit(e)}
					toggle={() => this.onBlur()}>
					<ModalHeader tag="h1">
						Login
						<p className="subtle"><em>(username and password are both 'admin')</em></p>
					</ModalHeader>
					<ModalBody>
						{this.renderLogin()}
					</ModalBody>
				</Modal>
			</div>
		);
	}

	renderLogin() {
		//logged in
		if (this.props.authorized) {
			//auto close modal after 1sec
			setTimeout(() => {
				if (this.props.modal_open) {
					this.onBlur();
				}
			}, 1000);

			return (
				<div className="d-flex justify-content-center">
					<FA name="check" size="5x" style={{ color: 'green' }}></FA>
				</div>
			);
		}
		//login loader
		else if (this.props.logging_in) {
			return (
				<Loader />
			);
		}
		//login promp
		else {
			return (
				<Form>
					<Input
						className="my-1"
						type="text"
						placeholder="username"
						onChange={(e) => this.onChange(e, 'username')}
						autoFocus />
					<Input
						className="my-1"
						type="password"
						placeholder="password"
						onChange={(e) => this.onChange(e, 'password')} />
					<Button
						className="mt-1"
						color="primary"
						onClick={() => this.onLogin()}>
						Login
					</Button>
				</Form>
			);
		}
	}

	onBlur() {
		//post login action
		if (typeof this.props.on_authorized === 'function') {
			this.props.on_authorized();
		}
		this.props.closeModal();
	}

	onChange(e, prop) {
		//store user/pass, shhh don't tell redux
		this[prop] = e.target.value;
	}

	onLogin() {
		this.props.login(this.username, this.password);
		this.username = '';
		this.password = '';
	}

	onSubmit(e) {
		if (e.key === 'Enter') {
			this.onLogin();
		}
	}
}

const mapStateToProps = function (store) {
	return {
		//react_prop: store.sub_store.prop
		modal_open: store.auth.modal_open,
		logging_in: store.auth.logging_in,
		authorized: store.auth.authorized,
		on_authorized: store.auth.on_authorized,
	};
}

const mapDispatchToProps = function (dispatch) {
	return {
		//react_prop: (param) => { dispatch(redux_action(param)) }
		closeModal: () => { dispatch(auth.closeModal()) },
		login: (user, pass) => { dispatch(auth.login(user, pass)) },
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);