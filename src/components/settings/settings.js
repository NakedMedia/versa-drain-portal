import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProfilePicture from './profile-picture';
import PasswordReset from './password-reset';
import EmployeeInfo from './employee-info';
import ClientInfo from './client-info';

import routes from '../../../config/routes';

import * as actions from '../../actions';

class Settings extends Component {
	renderUserInfo(selectedUser) {
		if (selectedUser.type !== 'client') {
			return (
				<EmployeeInfo
					me={this.props.me}
					employee={selectedUser}
					updateUser={this.props.updateUser}
				/>
			);
		}

		if (selectedUser.type === 'client') {
			return <ClientInfo client={selectedUser} updateUser={this.props.updateUser} />;
		}
	}

	render() {
		const idParam = parseInt(this.props.match.params.id, 10);
		let selectedUser = this.props.me;

		if (!this.props.me) return <div className="loader" />;

		if (this.props.me.type !== 'admin' && idParam) {
			return <Redirect to={`${routes.webRoot}/settings`} />;
		}

		if (idParam) {
			selectedUser = this.props.users.find(user => user.id === idParam);
		}

		return (
			<div>
				{this.renderUserInfo(selectedUser)}
				<ProfilePicture
					user={selectedUser}
					updateUser={this.props.updateUser}
					uploadImage={this.props.uploadImage}
				/>
				<PasswordReset user={selectedUser} updateUser={this.props.updateUser} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
		users:
			state.users.clients && state.users.employees
				? state.users.clients.concat(state.users.employees)
				: [],
	};
}

export default connect(mapStateToProps, actions)(Settings);
