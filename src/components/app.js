import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Nav from './nav/nav';
import Sidebar from './sidebar/sidebar';

import Login from './login/login';

import Dashboard from './dashboard/dashboard';
import Clients from './clients/clients';

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
					<Nav />
					<div className="columns is-marginless">
						<Sidebar user={this.props.me} logout={this.props.logout} />
						<div className="column vd-content">
							<Switch>
								{/*----- Dashboard Route -----*/}
								<Route path="/dashboard" component={Dashboard} />
								<Route path="/clients" component={Clients} />
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
	return { isLoggedIn: state.auth.isLoggedIn, me: state.users.me };
}

export default connect(mapStateToProps, actions)(App);
