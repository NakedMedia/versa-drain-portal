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

		let selectedReport = {
			description: '',
			media_ids: [],
			media_urls: [],
			employee: {},
			client: {},
		};

		if (props.match.params.id && props.reportsList) {
			selectedReport = props.reportsList.find(
				report => report.id === parseInt(props.match.params.id, 10)
			);
		}

		this.state = {
			description: selectedReport.description,
			media_ids: selectedReport.media_ids,
			media_urls: selectedReport.media_urls,
			employee_id: selectedReport.employee.id,
			client_id: selectedReport.client.id,
			errors: {},
		};
	}

	componentWillReceiveProps(newProps) {
		let selectedReport = {
			description: '',
			media_ids: [],
			media_urls: [],
			employee: {},
			client: {},
		};

		if (newProps.match.params.id && newProps.reportsList) {
			selectedReport = newProps.reportsList.find(
				report => report.id === parseInt(newProps.match.params.id, 10)
			);
		}

		this.state = {
			description: selectedReport.description,
			media_ids: selectedReport.media_ids,
			media_urls: selectedReport.media_urls,
			employee_id: selectedReport.employee.id,
			client_id: selectedReport.client.id,
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
			this.setState({
				isUploading: false,
				media_ids: [...this.state.media_ids, action.payload.data.media_id],
				media_urls: [...this.state.media_urls, action.payload.data.media_url],
			});
		});
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	handleEmployeeChange(selectedOption) {
		this.setState({ employee_id: selectedOption ? selectedOption.value : null });
	}

	handleClientChange(selectedOption) {
		this.setState({ client_id: selectedOption ? selectedOption.value : null });
	}

	deleteImage(index) {
		this.setState({
			media_ids: this.state.media_ids.filter((id, i) => i !== index),
			media_urls: this.state.media_urls.filter((url, i) => i !== index),
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ errors: {} });

		const description = this.state.description;
		const client_id = this.state.client_id;
		const employee_id =
			this.props.me.type === 'admin' ? this.state.employee_id : this.props.me.id;
		const media_ids = this.state.media_ids;

		if (!client_id || !description || !employee_id) {
			return this.setState({
				errors: {
					...this.state.errors,
					client_id: !client_id,
					employee_id: !employee_id,
					description: !description,
					message: !client_id || !description ? 'The fields in red are required' : '',
				},
			});
		}

		this.setState({ isLoading: true });

		if (this.props.match.params.id) {
			return this.props
				.updateReport({
					id: this.props.match.params.id,
					description,
					employee_id,
					client_id,
					media_ids,
				})
				.then(res => {
					if (res.payload.status === 200) this.setState({ finished: true });
					else this.setState({ isLoading: false });
				});
		}

		return this.props
			.createReport({ description, employee_id, client_id, media_ids })
			.then(res => {
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
				value={this.state.employee_id}
				options={this.renderOptions(this.props.employees)}
				onChange={this.handleEmployeeChange.bind(this)}
				placeholder="Select employee"
				className={`vd-search-select ${this.state.errors.employee
					? 'vd-search-select-danger'
					: ''}`}
			/>
		);
	}

	renderImages(urls) {
		if (urls.length === 0) return null;

		return urls.map((url, index) => (
			<div key={index} className="control">
				<div className="box vd-image-box" style={{ backgroundImage: `url(${url})` }}>
					<a className="delete" onClick={() => this.deleteImage(index)} />
				</div>
			</div>
		));
	}

	renderAddImage() {
		if (!this.state.isUploading) {
			return (
				<div className="control">
					<input
						className="file-input"
						type="file"
						ref="file"
						onChange={this.handleFile.bind(this)}
					/>
					<div
						className="box vd-image-box has-cursor-pointer"
						onClick={() => {
							this.refs.file.click();
						}}
					>
						<span className="icon is-large has-text-primary">
							<i className="fa fa-lg fa-plus" />
						</span>
						<span className="file-label has-text-grey-dark">Add Image</span>
					</div>
				</div>
			);
		}

		return (
			<div className="control">
				<div className="box vd-image-box">
					<div className="loader" />
				</div>
			</div>
		);
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
							onChange={this.handleDescriptionChange.bind(this)}
							className={`textarea vd-box-shadow ${this.state.errors.description
								? 'is-danger'
								: ''}`}
							value={this.state.description}
							placeholder="Enter report description"
						/>
					</div>
				</div>

				<div className="field">
					{this.renderEmployeeSelect(this.props.me.type)}

					<Select
						name="client"
						value={this.state.client_id}
						options={this.renderOptions(this.props.clients)}
						onChange={this.handleClientChange.bind(this)}
						placeholder="Select client"
						className={`vd-search-select ${this.state.errors.client
							? 'vd-search-select-danger'
							: ''}`}
					/>
				</div>
				<div className="field is-grouped is-grouped-multiline">
					{this.renderImages(this.state.media_urls)}
					{this.renderAddImage()}
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
		reportsList: state.reports.list,
		employees: state.users.employees,
		clients: state.users.clients,
	};
}

export default withRouter(connect(mapStateToProps, actions)(AddEditReport));
