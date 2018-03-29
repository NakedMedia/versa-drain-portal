/* eslint camelcase:0 */

import React, { Component } from 'react';

class EmployeeInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			employee: this.props.employee,
			errors: {},
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({ employee: newProps.employee });
	}

	handleInputChange(ref, e) {
		const employee = { ...this.state.employee };

		employee[ref] = e.target.value;

		this.setState({ employee });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ errors: { message: null } });

		const id = this.state.employee.id;
		const name = this.state.employee.name;
		const phone = this.state.employee.phone;
		const email = this.state.employee.email;
		const type = this.state.employee.type;

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
				this.setState({
					errors: { message: 'Employee updated successfully' },
					isLoading: false,
				});
			} else this.setState({ isLoading: false });
		});
	}

	renderTypeSelect(type) {
		if (type !== 'admin') return null;

		return (
			<div className="field">
				<div className="control">
					<span className="select">
						<select
							ref="type"
							value={this.state.employee.type}
							onChange={this.handleInputChange.bind(this, 'type')}
						>
							<option value="employee">Technician</option>
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
								onChange={this.handleInputChange.bind(this, 'name')}
								type="text"
								className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
								ref="name"
								placeholder="Enter employee name"
								value={this.state.employee.name}
							/>
						</div>
					</div>
					<div className="field is-grouped">
						<div className="control">
							<input
								onChange={this.handleInputChange.bind(this, 'phone')}
								type="text"
								className="input"
								ref="phone"
								placeholder="Enter employee phone"
								value={this.state.employee.phone}
							/>
						</div>
						<div className="control">
							<input
								onChange={this.handleInputChange.bind(this, 'email')}
								type="text"
								className="input"
								ref="email"
								placeholder="Enter employee email"
								value={this.state.employee.email}
							/>
						</div>
					</div>
					{this.renderTypeSelect(this.props.me.type)}
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
