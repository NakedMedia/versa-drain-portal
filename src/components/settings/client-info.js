/* eslint camelcase:0 */

import React, { Component } from 'react';

class ClientInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
		};
	}

	handleSubmit(e) {
		e.preventDefault();

		const id = this.props.client.id;
		const name = this.refs.name.value;
		const address = this.refs.address.value;
		const contact_name = this.refs.contact_name.value;
		const contact_email = this.refs.contact_email.value;
		const contact_phone = this.refs.contact_phone.value;
		const type = this.props.client.type;

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

		this.props
			.updateUser({
				id,
				name,
				address,
				contact_name,
				contact_email,
				contact_phone,
				type,
			})
			.then(res => {
				if (res.payload.status === 200) {
					this.setState({ errors: { message: 'Client updated successfully ' } });
				} else this.setState({ isLoading: false });
			});
	}

	render() {
		return (
			<div className="box">
				<h6 className="title is-6">Client Info</h6>
				<form className="form">
					<div className="field">
						<div className="control">
							<input
								type="text"
								className="input"
								ref="address"
								placeholder="Enter business address"
								defaultValue={this.props.client.address}
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
								defaultValue={this.props.client.name}
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
								defaultValue={this.props.client.contact_name}
							/>
						</div>
						<div className="control">
							<input
								type="text"
								className="input"
								ref="contact_email"
								placeholder="Enter contact email"
								defaultValue={this.props.client.contact_email}
							/>
						</div>
						<div className="control">
							<input
								type="text"
								className="input"
								ref="contact_phone"
								placeholder="Enter contact phone"
								defaultValue={this.props.client.contact_phone}
							/>
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
					</div>
					<p className="help is-danger">{this.state.errors.message}</p>
				</form>
			</div>
		);
	}
}

export default ClientInfo;
