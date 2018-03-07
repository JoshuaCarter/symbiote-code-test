import React, { Component } from 'react';
import { Container } from 'reactstrap';
import './App.css';
//components
import Login from './components/login';
import NavBar from './components/navbar';
import PageList from './components/page-list';
import PageView from './components/page-view';

class App extends Component {
	render() {
		return (
			<Container className="container-tall">
				<NavBar></NavBar>
				<div className="flex-tall">
					<PageList></PageList>
					<PageView></PageView>
				</div>
				<Login></Login>
			</Container>
		);
	}
}

export default App;
