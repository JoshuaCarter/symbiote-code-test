import React from 'react';
import './style.css';

class Loader extends React.Component {
	render() {
		return (
			<div className="d-flex justify-content-center">
				{this.renderLoader()}
			</div>
		);
	}

	renderLoader() {
		if (this.props.tiny) {
			return <div className="loader-tiny"></div>
		}
		if (this.props.small) {
			return <div className="loader-small"></div>
		}
		else if (this.props.large) {
			return <div className="loader-large"></div>
		}
		else {
			return <div className="loader"></div>
		}
	}
}

export default Loader;