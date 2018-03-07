import React, { Component } from 'react';

class PasswordReset extends Component {
	constructor(props) {
		super(props);

		this.state = {
			passMessage: null,
			isPassLoading: false,
		};
	}

	handlePasswordReset(e) {
		e.preventDefault();

		const currentPassword = this.refs.currentPassword.value;
		const newPassword = this.refs.newPassword.value;
		const confirmPassword = this.refs.confirmPassword.value;

		if (newPassword !== confirmPassword) {
			return this.setState({ passMessage: 'Passwords do not match' });
		}

		if (newPassword === '' || confirmPassword === '') {
			return this.setState({ passMessage: 'Please enter a new password' });
		}

		this.setState({ isPassLoading: true });

		this.props.changePassword(currentPassword, newPassword).then(action => {
			this.setState({ isPassLoading: false, passMessage: action.payload.data.message });
		});
	}

	render() {
		return (
			<div className="box">
				<form className="form" onSubmit={this.handlePasswordReset.bind(this)}>
					<h6 className="title is-6 has-text-grey-dark">Reset Password</h6>
					<div className="field">
						<div className="control">
							<input
								className="input"
								type="password"
								ref="currentPassword"
								placeholder="Current Password"
							/>
						</div>
					</div>
					<br />
					<div className="field">
						<div className="control">
							<input
								className="input"
								type="password"
								ref="newPassword"
								placeholder="New Password"
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<input
								className="input"
								type="password"
								ref="confirmPassword"
								placeholder="Confirm Password"
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button
								className={`button is-primary ${this.state.isPassLoading
									? 'is-loading'
									: ''}`}
								type="submit"
							>
								Submit
							</button>
						</div>
						<p className="help has-text-primary">{this.state.passMessage}</p>
					</div>
				</form>
			</div>
		);
	}
}

export default PasswordReset;
