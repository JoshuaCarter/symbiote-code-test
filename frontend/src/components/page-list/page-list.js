import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
//reducer actions
import pages from '../../reducers/pages';
import auth from '../../reducers/auth';
//components
import Loader from '../loader';

class PageList extends React.Component {

	componentDidMount() {
		this.props.getPagesList();
	}

	render() {
		return (
			<div className="page-list bg-dark mt-1">
				<Nav className="sidebar" vertical>
					<h5 className="px-3 pt-3 pb-2" style={{ color: 'silver' }}>Pages</h5>
					{this.renderPageList()}
					{this.renderAddPage()}
				</Nav>
			</div>
		);
	}

	renderAddPage() {
		if (this.props.authorized) {
			return (
				<NavItem>
					<NavLink
						className="link-add"
						onClick={() => this.onAddPage()}
						href="#"
						active={true}>
						+Add Page
						</NavLink>
				</NavItem>
			);
		}
	}

	renderPageList() {
		if (this.props.page_list.length > 0) {
			this.props.page_list.sort();
			return (
				<NavItem>
					{
						this.props.page_list.map((page, i) => {
							return (
								<NavLink
									key={i}
									className="link-page py-1"
									href="#"
									onClick={(e) => this.onPageSelect(e, page)}
									active={this.props.page && this.props.page.title === page}>
									{page}
								</NavLink>
							);
						})
					}
				</NavItem>
			);
		}
		else {
			return <Loader small />;
		}
	}

	onPageSelect(e, page) {
		if (!this.props.authorized) {
			if (!this.props.modal_open) {
				this.props.openModal(() => {
					this.onPageSelect(e, page);
				});
			}
		}
		else {
			this.props.readPage(page);
		}
	}

	onAddPage() {
		this.props.makePage();
	}
}

const mapStateToProps = function (store) {
	return {
		//react_prop: store.sub_store.prop
		page_list: store.pages.page_list,
		page: store.pages.page,
		authorized: store.auth.authorized,
		modal_open: store.auth.modal_open,
	};
}

const mapDispatchToProps = function (dispatch) {
	return {
		//react_prop: (param) => { dispatch(redux_action(param)) }
		getPagesList: () => { dispatch(pages.getPagesList()) },
		readPage: (page) => { dispatch(pages.readPage(page)) },
		makePage: () => { dispatch(pages.makePage()) },
		openModal: (on_authorized) => { dispatch(auth.openModal(on_authorized)) },
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PageList);