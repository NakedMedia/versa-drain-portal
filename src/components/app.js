import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Sidebar from './sidebar/sidebar';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';

class App extends Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem('vd-token');

		if (token) this.props.fetchAll(token);
	}

	render() {
		if (!this.props.isLoggedIn) return <Login />;

		return (
			<BrowserRouter>
				<div className="container is-fluid">
					<div className="columns is-marginless">
						<Sidebar />
						<div className="column vd-content">
							<Switch>
								{/*----- Dashboard Route -----*/}
								<Route path="/dashboard" component={Dashboard} />

								{/*----- Default Route -----*/}
								<Redirect from="/" to="/dashboard" push />
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

function mapStateToProps(state) {
	return { isLoggedIn: state.auth.isLoggedIn };
}

export default connect(mapStateToProps, actions)(App);
