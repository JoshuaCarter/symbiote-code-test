import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import FA from 'react-fontawesome';
import { Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
//import reducers
import pages from '../../reducers/pages';
//components
import Loader from '../loader';

class PageView extends React.Component {

	ele_title = null;
	ele_content = null;

	componentDidUpdate() {
		if (this.props.page) {
			this.ele_title.value = this.props.page.title;
			this.ele_content.value = this.props.page.content;
		}
	}

	render() {
		return (
			<div className="page-view bg-dark p-3 mt-1 ml-1">
				<div className="d-flex justify-content-between">
					<h5 className="mb-3" style={{ color: 'silver' }}>Page Content</h5>
					{this.renderLoader()}
				</div>
				{this.renderPage()}
			</div>
		);
	}

	renderLoader() {
		if (this.props.create_requested || this.props.read_requested ||
			this.props.update_requested || this.props.delete_requested) {
			return <Loader tiny />
		}
	}

	renderPage() {
		if (this.props.page) {
			return (
				<div>
					<Form>
						<FormGroup>
							<Label style={{ color: 'silver' }} for="title">Title:</Label>
							<Input
								innerRef={(e) => this.ele_title = e}
								className="px-2"
								type="textarea"
								id="title"
								rows="1"
								defaultValue={this.props.page.title}
								disabled={!this.props.editing}
								valid={this.props.editing}
								invalid={!this.props.editing} />
						</FormGroup>
						<FormGroup>
							<Label style={{ color: 'silver' }} for="content">Content:</Label>
							<Input
								innerRef={(e) => this.ele_content = e}
								className="px-2"
								type="textarea"
								id="content"
								rows="5"
								defaultValue={this.props.page.content}
								disabled={!this.props.editing}
								valid={this.props.editing}
								invalid={!this.props.editing} />
						</FormGroup>
					</Form>
					{this.renderButtons()}
				</div>
			);
		}
	}

	renderButtons() {
		let buttons = [];

		if (this.props.editing) {
			buttons.push(
				<NavLink
					key={buttons.length}
					className="p-0 ml-1 mr-3"
					href="#"
					onClick={() => this.onSave()}>
					<FA className="button" name="save" />
				</NavLink>
			);
			buttons.push(
				<NavLink
					key={buttons.length}
					className="p-0"
					href="#"
					onClick={() => this.onCancel()}>
					<FA className="button" name="ban" />
				</NavLink>
			);
		}

		if (!this.props.making) {
			buttons.push(
				<NavLink
					key={buttons.length}
					className="ml-auto mt-px p-0"
					href="#"
					onClick={() => this.onEdit()}>
					<FA className="button" name="edit" />
				</NavLink>
			);
			buttons.push(
				<NavLink
					key={buttons.length}
					className="ml-3 mr-1 p-0"
					href="#"
					onClick={() => this.onDelete()}>
					<FA className="button" name="trash" />
				</NavLink>
			);
		}

		return (
			<div>
				<div className="d-flex justify-content-start">
					{buttons}
				</div>
			</div>
		);
	}

	onEdit() {
		this.props.editPage();
	}

	onDelete() {
		this.props.deletePage(this.props.page.title);
	}

	onCancel() {
		if (this.props.making) {
			this.props.makeCancel();
		}
		else {
			this.ele_title.value = this.props.page.title;
			this.ele_content.value = this.props.page.content;
			this.props.editCancel();
		}
	}

	onSave() {
		if (this.props.making) {
			this.props.createPage(
				this.ele_title.value,
				this.ele_content.value);
		}
		else {
			this.props.updatePage(
				this.props.page.title,
				this.ele_title.value,
				this.ele_content.value);
		}
	}
}

const mapStateToProps = function (store) {
	return {
		//react_prop: store.sub_store.prop
		page: store.pages.page,
		editing: store.pages.editing,
		making: store.pages.making,
		create_requested: store.pages.create_requested,
		read_requested: store.pages.read_requested,
		update_requested: store.pages.update_requested,
		delete_requested: store.pages.delete_requested,
	};
}

const mapDispatchToProps = function (dispatch) {
	return {
		//react_prop: (param) => { dispatch(redux_action(param)) }
		editPage: () => { dispatch(pages.editPage()) },
		editCancel: () => { dispatch(pages.editCancel()) },
		makeCancel: () => { dispatch(pages.makeCancel()) },
		updatePage: (page, title, content) => { dispatch(pages.updatePage(page, title, content)) },
		deletePage: (page) => { dispatch(pages.deletePage(page)) },
		createPage: (title, content) => { dispatch(pages.createPage(title, content)) },
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PageView);