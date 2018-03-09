import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import routes from '../../config/routes';

import Nav from './nav/nav';
import Sidebar from './sidebar/sidebar';

import Login from './login/login';

import Dashboard from './dashboard/dashboard';

import AddEditClient from './clients/add-edit-client';
import Clients from './clients/clients';

import AddEditTechnician from './technicians/add-edit-technician';
import Technicians from './technicians/technicians';

import Reports from './reports/reports';
import AddEditReport from './reports/add-edit-report';
import Settings from './settings/settings';

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
								<Route path={`${routes.webRoot}/dashboard`} component={Dashboard} />

								{/*----- Clients Routes -----*/}
								<Route
									path={`${routes.webRoot}/clients/new`}
									component={AddEditClient}
								/>
								<Route
									path={`${routes.webRoot}/clients/:id/edit`}
									component={Settings}
								/>
								<Route path={`${routes.webRoot}/clients`} component={Clients} />

								{/*----- Technicians Routes -----*/}
								<Route
									path={`${routes.webRoot}/technicians/new`}
									component={AddEditTechnician}
								/>
								<Route
									path={`${routes.webRoot}/technicians/:id/edit`}
									component={Settings}
								/>
								<Route
									path={`${routes.webRoot}/technicians`}
									component={Technicians}
								/>

								{/*----- Reports Routes -----*/}
								<Route
									path={`${routes.webRoot}/reports/new`}
									component={AddEditReport}
								/>
								<Route
									path={`${routes.webRoot}/reports/:id/edit`}
									component={AddEditReport}
								/>
								<Route path={`${routes.webRoot}/reports/:id`} component={Reports} />
								<Route path={`${routes.webRoot}/reports`} component={Reports} />
								<Route path={`${routes.webRoot}/settings`} component={Settings} />

								{/*----- Default Route -----*/}
								<Redirect
									from={`${routes.webRoot}/`}
									to={`${routes.webRoot}/dashboard`}
									push
								/>
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
