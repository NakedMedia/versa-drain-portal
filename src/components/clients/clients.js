import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../../../config/routes';

import * as actions from '../../actions';

import emptyProfile from '../../img/empty-profile.jpg';

class Clients extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
		};
	}

	handleSearch(e) {
		this.setState({ search: e.target.value.toLowerCase() });
	}

	renderAdminOptions(type, client) {
		if (type !== 'admin') return null;

		return (
			<div className="media-right">
				<span className="icon has-text-primary is-large">
					<Link to={`${routes.webRoot}/clients/${client.id}/edit`}>
						<i className="fas fa-edit" />
					</Link>
				</span>

				<span className="icon has-text-primary is-large">
					<a
						onClick={() => {
							this.props.deleteUser(client);
						}}
					>
						<i className="fas fa-trash" />
					</a>
				</span>
			</div>
		);
	}

	renderClients(clients) {
		if (!this.props.clientsList || !this.props.me) return <div className="loader" />;
		if (this.props.clientsList.length === 0) return <h3>No Clients</h3>;

		return clients
			.filter(
				client =>
					client.id.toString().startsWith(this.state.search) ||
					client.name.toLowerCase().startsWith(this.state.search) ||
					client.address.toLowerCase().startsWith(this.state.search) ||
					client.contact_name.toLowerCase().startsWith(this.state.search) ||
					client.contact_email.toLowerCase().startsWith(this.state.search) ||
					client.contact_phone.toLowerCase().startsWith(this.state.search)
			)
			.map(client => (
				<div className="box" key={client.id}>
					<article className="media">
						<div className="media-left">
							<figure className="image is-64x64 vd-profile-picture">
								<img src={client.img || emptyProfile} alt="Client" />
							</figure>
						</div>
						<div className="media-content">
							<div className="content">
								<p>
									<Link to={`${routes.webRoot}/reports/${client.id}`}>
										{client.name}
									</Link>
									<br />
									<small>
										<strong>Client ID: </strong>
										{client.id}
									</small>
									<br />
									<small>
										<strong>Address: </strong>
										{client.address ? (
											<a
												href={`https://maps.google.com/?q=${client.address}`}
											>
												{client.address}
											</a>
										) : (
											'N/A'
										)}
									</small>
									<br />
									<small>
										<strong>Phone: </strong>
										{client.contact_phone || 'N/A'}
									</small>
									<br />
									<small>
										<strong>Contact Name: </strong>
										{client.contact_name || 'N/A'}
									</small>
									<br />
									<small>
										<strong>Contact Email: </strong>
										{client.contact_email || 'N/A'}
									</small>
								</p>
							</div>
						</div>
						{this.renderAdminOptions(this.props.me.type, client)}
					</article>
				</div>
			));
	}

	render() {
		return (
			<div>
				<div className="field has-addons">
					<p className="control has-icons-left has-icons-right vd-report-search">
						<input
							className="input"
							type="text"
							placeholder="Search Clients"
							onChange={this.handleSearch.bind(this)}
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-search" />
						</span>
					</p>
				</div>
				{this.renderClients(this.props.clientsList)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
		reportsList: state.reports.list,
		clientsList: state.users.clients,
	};
}

export default connect(mapStateToProps, actions)(Clients);
