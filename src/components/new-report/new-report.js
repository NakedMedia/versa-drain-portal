/* eslint camelcase:0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/es/withRouter';

import routes from '../../../config/routes';

import * as actions from '../../actions';

class NewReport extends Component {
	constructor(props) {
		super(props);

		this.state = {
			media_id: null,
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

	handleSubmit(e) {
		e.preventDefault();

		const description = this.refs.description.value;
		const client_id = parseInt(this.refs.client.value, 10);
		const employee_id = this.props.me.id;
		const media_id = this.state.media_id;

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

		this.props.createReport({ description, employee_id, client_id, media_id }).then(res => {
			if (res.payload.status === 200) this.setState({ finished: true });
			else this.setState({ isLoading: false });
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
				<div className="field is-grouped">
					<p className="control">
						<span className={`select ${this.state.errors.client ? 'is-danger' : ''}`}>
							<select ref="client">
								<option value={null}>Select Client</option>
								{this.renderOptions(this.props.clients)}
							</select>
						</span>
					</p>
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
		clients: state.users.clients,
	};
}

export default withRouter(connect(mapStateToProps, actions)(NewReport));
