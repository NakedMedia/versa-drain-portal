/* eslint camelcase:0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/es/withRouter';
import Select from 'react-select';

import routes from '../../../config/routes';

import * as actions from '../../actions';

class AddEditReport extends Component {
	constructor(props) {
		super(props);

		this.state = {
			media_id: null,
			employee: null,
			client: null,
			errors: {},
		};
	}

	handleCancel() {
		this.props.history.go(-1);
	}

	handleFile(e) {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('file', file);
		this.setState({ isUploading: true });

		this.props.uploadImage(formData).then(action => {
			this.setState({ isUploading: false, media_id: action.payload.data.media_id });
		});
	}

	handleEmployeeChange(selectedOption) {
		this.setState({ employee: selectedOption });
	}

	handleClientChange(selectedOption) {
		this.setState({ client: selectedOption });
	}

	handleSubmit(e) {
		e.preventDefault();

		const description = this.refs.description.value;
		const client = this.state.client;
		const employee = this.props.me.type === 'admin' ? this.state.employee : this.props.me.id;
		const media_id = this.state.media_id;

		console.log(employee, client);

		if (!client || !description || !employee) {
			return this.setState({
				errors: {
					...this.state.errors,
					client: !client,
					employee: !employee,
					description: !description,
					message: !client_id || !description ? 'The fields in red are required' : '',
				},
			});
		}

		const employee_id = employee.value;
		const client_id = client.value;

		this.setState({ isLoading: true });

		this.props.createReport({ description, employee_id, client_id, media_id }).then(res => {
			if (res.payload.status === 200) this.setState({ finished: true });
			else this.setState({ isLoading: false });
		});
	}

	renderOptions(clients) {
		if (!clients || clients.length === 0) return [];

		return clients.map(user => ({
			value: user.id,
			label: `#${user.id} - ${user.name}`,
		}));
	}

	renderEmployeeSelect(type) {
		if (type !== 'admin') return null;

		return (
			<Select
				name="employee"
				value={this.state.employee}
				options={this.renderOptions(this.props.employees)}
				onChange={this.handleEmployeeChange.bind(this)}
				placeholder="Select employee"
				className={`vd-search-select ${this.state.errors.employee
					? 'vd-search-select-danger'
					: ''}`}
			/>
		);
	}

	renderFileName() {
		if (this.state.isUploading) {
			return (
				<span className="file-name vd-file-name">
					<div className="loader" />
				</span>
			);
		}

		if (this.state.media_id) {
			return (
				<span className="file-name vd-file-name">
					<span className="icon has-text-primary">
						<i className="fa fa-check" />
					</span>
				</span>
			);
		}

		return null;
	}

	render() {
		if (!this.props.me) return <div className="loader" />;
		if (this.state.finished) return <Redirect to={`${routes.webRoot}/reports`} />;

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
					{this.renderEmployeeSelect(this.props.me.type)}

					<Select
						name="client"
						value={this.state.client}
						options={this.renderOptions(this.props.clients)}
						onChange={this.handleClientChange.bind(this)}
						placeholder="Select client"
						className={`vd-search-select ${this.state.errors.client
							? 'vd-search-select-danger'
							: ''}`}
					/>
				</div>
				<div className="field is-grouped">
					<div className="control">
						<div className="file is-white vd-box-shadow">
							<div htmlFor="file" className="file-label">
								<input
									className="file-input"
									type="file"
									ref="file"
									onChange={this.handleFile.bind(this)}
								/>
								<span
									className="file-cta"
									onClick={() => {
										this.refs.file.click();
									}}
								>
									<span className="file-icon has-text-grey-dark">
										<i className="fas fa-upload" />
									</span>
									<span className="file-label has-text-grey-dark">
										Upload Image
									</span>
								</span>
								{this.renderFileName()}
							</div>
						</div>
					</div>
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
		employees: state.users.employees,
		clients: state.users.clients,
	};
}

export default withRouter(connect(mapStateToProps, actions)(AddEditReport));
