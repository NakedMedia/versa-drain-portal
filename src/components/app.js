import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Nav from './nav/nav';
import Sidebar from './sidebar/sidebar';

import Login from './login/login';

import Dashboard from './dashboard/dashboard';
import Clients from './clients/clients';
import Technicians from './technicians/technicians';
import Reports from './reports/reports';
import NewReport from './new-report/new-report';

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
					<Nav user={this.props.me} />
					<div className="columns is-marginless">
						<Sidebar user={this.props.me} logout={this.props.logout} />
						<div className="column vd-content">
							<Switch>
								{/*----- Dashboard Route -----*/}
								<Route path="/dashboard" component={Dashboard} />
								<Route path="/clients" component={Clients} />
								<Route path="/technicians" component={Technicians} />
								<Route path="/reports/:id" component={Reports} />
								<Route path="/reports" component={Reports} />
								<Route path="/new-report" component={NewReport} />
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
