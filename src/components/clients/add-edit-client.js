/* eslint camelcase:0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/es/withRouter';

import routes from '../../../config/routes';

import * as actions from '../../actions';

class AddEditClient extends Component {
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
		this.setState({ errors: {} });

		function getExtension(filename) {
			const parts = filename.split('.');
			return parts[parts.length - 1];
		}

		function isImage(filename) {
			const ext = getExtension(filename);
			switch (ext.toLowerCase()) {
				case 'jpg':
				case 'gif':
				case 'bmp':
				case 'png':
					//etc
					return true;

				default:
					return false;
			}
		}

		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('file', file);

		if (!isImage(file.name)) {
			return this.setState({
				errors: { message: 'The selected file is not a supported image' },
			});
		}

		this.setState({ isUploading: true });

		this.props.uploadImage(formData).then(action => {
			this.setState({ isUploading: false, media_id: action.payload.data.media_id });
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		const id = this.refs.id.value;
		const name = this.refs.name.value;
		const address = this.refs.address.value;
		const media_id = this.state.media_id;
		const contact_name = this.refs.contact_name.value;
		const contact_email = this.refs.contact_email.value;
		const contact_phone = this.refs.contact_phone.value;
		const password = this.refs.password.value;
		const confirmPassword = this.refs.confirmPassword.value;

		if (!id || !name || !password || !confirmPassword) {
			return this.setState({
				errors: {
					...this.state.errors,
					id: !id,
					name: !name,
					password: !password,
					confirmPassword: !confirmPassword,
					message:
						!id || !name || !password || !confirmPassword
							? 'The fields in red are required'
							: '',
				},
			});
		}

		if (password !== confirmPassword) {
			return this.setState({
				errors: {
					password: true,
					confirmPassword: true,
					message: 'Passwords do not match',
				},
			});
		}

		this.setState({ isLoading: true });

		this.props
			.createClient({
				id,
				name,
				address,
				contact_name,
				contact_email,
				contact_phone,
				password,
				media_id,
			})
			.then(res => {
				if (res.payload.status === 200) this.setState({ finished: true });
				else this.setState({ isLoading: false });
			});
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

		if (this.state.finished || this.props.me.type !== 'admin') {
			return <Redirect to={`${routes.webRoot}/clients`} />;
		}

		return (
			<div className="box">
				<h6 className="title is-6">Client Info</h6>
				<form className="form">
					<div className="field is-grouped">
						<div className="control">
							<input
								type="text"
								className={`input ${this.state.errors.id ? 'is-danger' : ''}`}
								ref="id"
								placeholder="Enter client id"
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<input
								type="text"
								className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
								ref="name"
								placeholder="Enter client name"
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<input
								type="text"
								className="input"
								ref="address"
								placeholder="Enter business address"
							/>
						</div>
					</div>
					<div className="field is-grouped">
						<div className="control">
							<input
								type="text"
								className="input"
								ref="contact_name"
								placeholder="Enter contact name"
							/>
						</div>
						<div className="control">
							<input
								type="text"
								className="input"
								ref="contact_email"
								placeholder="Enter contact email"
							/>
						</div>
						<div className="control">
							<input
								type="text"
								className="input"
								ref="contact_phone"
								placeholder="Enter contact phone"
							/>
						</div>
					</div>
					<br />
					<div className="field">
						<div className="control">
							<input
								type="password"
								className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
								ref="password"
								placeholder="Enter password"
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<input
								type="password"
								className={`input ${this.state.errors.confirmPassword
									? 'is-danger'
									: ''}`}
								ref="confirmPassword"
								placeholder="Confirm password"
							/>
						</div>
					</div>
					<br />
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
											Upload Profile Picture
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
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
	};
}

export default withRouter(connect(mapStateToProps, actions)(AddEditClient));
