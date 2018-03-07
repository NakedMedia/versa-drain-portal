import React, { Component } from 'react';

class ProfilePicture extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profileMessage: null,
			isUploading: false,
			isProfileLoading: false,
			media_id: null,
		};
	}

	handleProfilePicture(e) {
		e.preventDefault();

		this.setState({ isProfileLoading: true });
		this.props.changeProfilePicture(this.state.media_id).then(action => {
			if (action.payload.data.error) {
				return this.setState({
					isProfileLoading: false,
					profileMessage: action.payload.data.error,
				});
			}

			if (action.payload.data.id) {
				return this.setState({
					isProfileLoading: false,
					profileMessage: 'Profile picture updated successfully',
				});
			}
		});
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
		return (
			<div className="box">
				<form className="form" onSubmit={this.handleProfilePicture.bind(this)}>
					<h6 className="title is-6 has-text-grey-dark">Change Profile Picture</h6>
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
					<div className="field">
						<div className="control">
							<button
								className={`button is-primary ${this.state.isProfileLoading
									? 'is-loading'
									: ''}`}
								type="submit"
							>
								Submit
							</button>
						</div>
						<p className="help has-text-primary">{this.state.profileMessage}</p>
					</div>
				</form>
			</div>
		);
	}
}

export default ProfilePicture;
