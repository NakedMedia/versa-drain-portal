/* eslint camelcase:0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/es/withRouter';

import routes from '../../../config/routes';

import * as actions from '../../actions';

class EmployeeInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
		};
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ errors: { message: null } });

		const id = this.props.employee.id;
		const name = this.refs.name.value;
		const phone = this.refs.phone.value;
		const email = this.refs.email.value;
		const type = this.refs.type.value;

		if (!name) {
			return this.setState({
				errors: {
					...this.state.errors,
					name: !name,
					message: !name ? 'The fields in red are required' : '',
				},
			});
		}

		this.setState({ isLoading: true });

		this.props.updateUser({ id, name, email, phone, type }).then(res => {
			if (res.payload.status === 200) {
				this.setState({ errors: { message: 'Employee updated successfully' } });
			} else this.setState({ isLoading: false });
		});
	}

	renderTypeSelect(type) {
		if (type !== 'admin') return null;

		return (
			<div className="field">
				<div className="control">
					<span className="select">
						<select ref="type" defaultValue={this.props.employee.type}>
							<option value="employee">Employee</option>
							<option value="admin">Admin</option>
						</select>
					</span>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="box">
				<h6 className="title is-6">Employee Info</h6>
				<form className="form">
					<div className="field">
						<div className="control">
							<input
								type="text"
								className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
								ref="name"
								placeholder="Enter employee name"
								defaultValue={this.props.employee.name}
							/>
						</div>
					</div>
					<div className="field is-grouped">
						<div className="control">
							<input
								type="text"
								className="input"
								ref="phone"
								placeholder="Enter employee phone"
								defaultValue={this.props.employee.phone}
							/>
						</div>
						<div className="control">
							<input
								type="text"
								className="input"
								ref="email"
								placeholder="Enter employee email"
								defaultValue={this.props.employee.email}
							/>
						</div>
					</div>
					{this.renderTypeSelect(this.props.employee.type)}
					<div className="field is-grouped">
						<div className="control">
							<button
								onClick={this.handleSubmit.bind(this)}
								type="submit"
								className={`button is-primary ${this.state.isLoading
									? 'is-loading'
									: ''}`}
							>
								Submit
							</button>
						</div>
					</div>
					<p className="help is-danger">{this.state.errors.message}</p>
				</form>
			</div>
		);
	}
}

export default EmployeeInfo;
