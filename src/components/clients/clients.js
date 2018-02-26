import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../../../config/routes';

import emptyProfile from '../../img/empty-profile.jpg';

const Clients = props => {
	function renderClients(clients) {
		if (!props.reportsList) return <div className="loader" />;
		if (props.reportsList.length === 0) return <h3>No Clients</h3>;

		return clients.map(client => (
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
										<a href={`https://maps.google.com/?q=${client.address}`}>
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
				</article>
			</div>
		));
	}

	return <div>{renderClients(props.clientsList)}</div>;
};

function mapStateToProps(state) {
	return {
		reportsList: state.reports.list,
		clientsList: state.users.clients,
	};
}

export default connect(mapStateToProps)(Clients);
