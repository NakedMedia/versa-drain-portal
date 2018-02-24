/* eslint camelcase:0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/es/withRouter';

import * as actions from '../../actions';

class NewReport extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
		};
	}

	handleCancel() {
		this.props.history.go(-1);
	}

	handleSubmit(e) {
		e.preventDefault();

		const description = this.refs.description.value;
		const client_id = parseInt(this.refs.client.value, 10);
		const employee_id = this.props.me.id;

		if (!client_id || !description) {
			return this.setState({
				errors: {
					...this.state.errors,
					client: !client_id,
					description: !description,
					message: !client_id || !description ? 'The fields in red are required' : '',
				},
			});
		}

		this.setState({ isLoading: true });

		this.props.createReport({ description, employee_id, client_id }).then(res => {
			if (res.payload.status === 200) this.setState({ finished: true });
			else {
				console.log(res);
				this.setState({ isLoading: false });
			}
		});
	}

	renderOptions(clients) {
		if (!clients || clients.length === 0) return null;

		return clients.map(user => (
			<option key={user.id} value={user.id}>
				{user.name}
			</option>
		));
	}

	render() {
		if (this.state.finished) return <Redirect to="/reports" />;

		return (
			<form className="form">
				<div className="field">
					<div className="control">
						<textarea
							ref="description"
							rows="16"
							className={`textarea vd-box-shadow ${this.state.errors.description
								? 'is-danger'
								: ''}`}
							placeholder="Enter report description"
						/>
					</div>
				</div>
				<div className="field">
					<p className="control">
						<span className={`select ${this.state.errors.client ? 'is-danger' : ''}`}>
							<select ref="client">
								<option value={null}>Select Client</option>
								{this.renderOptions(this.props.clients)}
							</select>
						</span>
					</p>
				</div>
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
					<div className="control">
						<a onClick={this.handleCancel.bind(this)} className="button is-text">
							Cancel
						</a>
					</div>
				</div>
				<p className="help is-danger">{this.state.errors.message}</p>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
		clients: state.users.clients,
	};
}

export default withRouter(connect(mapStateToProps, actions)(NewReport));
