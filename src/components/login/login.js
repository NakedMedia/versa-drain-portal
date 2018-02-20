import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import logo from '../../img/logo.png';

class Login extends Component {
	onFormSubmit(e) {
		e.preventDefault();
		const id = this.refs.id.value;
		const password = this.refs.password.value;

		this.props.login(id, password);
	}

	render() {
		return (
			<div className="login-form-container">
				<form onSubmit={this.onFormSubmit.bind(this)} className="login-form card">
					<div className="card-content has-text-centered">
						<img
							role="presentation"
							src={logo}
							className="logo"
							width="190"
							height="30"
						/>

						<div className="field">
							<label htmlFor="id">ID#</label>
							<div className="control">
								<input type="text" className="input has-text-centered" ref="id" />
							</div>
						</div>

						<div className="field">
							<label htmlFor="password">Password</label>
							<div className="control">
								<input
									type="password"
									className="input has-text-centered"
									ref="password"
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<button className="button is-fullwidth">Login</button>
							</div>
						</div>

						<p className="help is-danger">{this.props.error}</p>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { error: state.auth.error };
}

export default connect(mapStateToProps, actions)(Login);
