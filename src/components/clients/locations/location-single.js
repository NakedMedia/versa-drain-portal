import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/es/withRouter';

import * as actions from '../../../actions';

import InfoTile from '../../common/info-tile';
import ReportList from '../../common/report-list';

import emptyProfile from '../../../img/empty-profile.jpg';

import routes from '../../../../config/routes';

const storesAreLoaded = props => {
  if (!props.clientsList) return false;
  if (!props.locationList) return false;
  if (!props.reportsList) return false;
  if (!props.me) return false;

  return true;
};

const getTechniciansFromReports = reports => {
  const technicianMap = reports.reduce(
    (acc, report) => ({ ...acc, [report.employee.id]: report.employee }),
    {}
  );

  return Object.values(technicianMap);
};

const LocationSingleNav = props => (
  <div className="columns">
    <div className="column">
      <nav className="level" style={{ height: '100%' }}>
        <div className="level-item has-text-centered">
          <div>
            <figure className="image is-64x64 vd-profile-picture">
              <img src={props.client.img || emptyProfile} alt="Client" />
            </figure>

            <h3 className="title is-3 has-text-grey">{props.client.name}</h3>
          </div>
        </div>
      </nav>
    </div>
    <div className="column">
      <InfoTile icon="building" name={props.location.name} />
    </div>
    <div className="column">
      <InfoTile icon="clipboard" content={props.reports.length} name="Reports" />
    </div>
  </div>
);

const LocationSingle = props => {
  const clientId = parseInt(props.match.params.clientId, 10);
  const locationId = parseInt(props.match.params.locationId, 10);

  if (!storesAreLoaded(props)) return <div className="loader" />;

  const selectedClient = props.clientsList.find(client => client.id === clientId);
  const selectedLocation = props.locationList.find(location => location.id === locationId);

  if (!selectedClient || !selectedLocation) return <Redirect to={`${routes.webRoot}/dashboard`} />;

  const locationReports = props.reportsList.filter(
    report => report.location.id === selectedLocation.id
  );

  const locationEmployees = getTechniciansFromReports(locationReports);

  const onEdit = report => props.history.push(`${routes.webRoot}/reports/${report.id}/edit`);
  const onDelete = report => props.deleteLocation(report);

  const isAdmin = props.me.type === 'admin';

  return (
    <div>
      <LocationSingleNav
        client={selectedClient}
        location={selectedLocation}
        reports={locationReports}
      />
      <ReportList
        reports={locationReports}
        employees={locationEmployees}
        onEdit={onEdit}
        onDelete={onDelete}
        isAdmin={isAdmin}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  clientsList: state.users.clients,
  locationList: state.locations.list,
  reportsList: state.reports.list,
  me: state.users.me
});

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(LocationSingle)
);
