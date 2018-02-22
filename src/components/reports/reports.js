import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import emptyProfile from '../../img/empty-profile.jpg';

class Reports extends Component {
	renderReportImage(img) {
		if (!img) return null;

		return (
			<figure className="media-right">
				<a href={img}>
					<span className="icon is-medium has-text-primary">
						<i className="fa fa-image" />
					</span>
				</a>
			</figure>
		);
	}

	renderReports(reports) {
		return reports.map(report => (
			<div className="box" key={report.id}>
				<nav className="level is-mobile">
					<div className="level-left">
						<figure className="level-item image is-48x48 vd-profile-picture">
							<img src={report.employee.img || emptyProfile} alt="User" />
						</figure>
						<p className="level-item has-text-grey">{report.employee.name}</p>
					</div>
					<div className="level-left level-vertical is-hidden-mobile">
						<p className="has-text-grey-light is-size-7">
							{moment(report.date).format('lll')}
						</p>
					</div>
					<div className="level-right">
						<p className="level-item has-text-grey">{report.client.name}</p>
						<figure className="level-item image is-48x48 vd-profile-picture">
							<img src={report.client.img || emptyProfile} alt="User" />
						</figure>
					</div>
				</nav>
				<hr />
				<nav className="media has-text-grey">
					<div className="media-content">
						<p>{report.description}</p>
					</div>
					{this.renderReportImage(report.img)}
				</nav>
			</div>
		));
	}

	render() {
		if (!this.props.reportsList || !this.props.me) return <div className="loader" />;
		if (this.props.reportsList.length === 0) return <h3>No Reports</h3>;

		return <div>{this.renderReports(this.props.reportsList)}</div>;
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
		reportsList: state.reports.list,
	};
}

export default connect(mapStateToProps)(Reports);
