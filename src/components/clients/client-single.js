import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import emptyProfile from '../../img/empty-profile.jpg';

import routes from '../../../config/routes';

import * as actions from '../../actions';

import InfoTile from '../common/info-tile';

import LocationList from '../common/location-list';

const storesAreLoaded = props => {
  if (!props.clientsList) return false;
  if (!props.locationsList) return false;
  if (!props.reportsList) return false;
  if (!props.me) return false;

  return true;
};

const ClientSingleNav = props => (
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
      <InfoTile icon="building" content={props.locations.length} name="Locations" />
    </div>
    <div className="column">
      <InfoTile icon="clipboard" content={props.reports.length} name="Reports" />
    </div>
  </div>
);

const ClientSingle = props => {
  const clientId = parseInt(props.match.params.id, 10);

  if (!storesAreLoaded(props)) return <div className="loader" />;

  const selectedClient = props.clientsList.find(client => client.id === clientId);

  if (!selectedClient) return <Redirect to={`${routes.webRoot}/clients`} />;

  const clientReports = props.reportsList.filter(report => report.client.id === selectedClient.id);
  const clientLocations = props.locationsList.filter(loc => loc.client.id === selectedClient.id);

  const onDelete = location => props.deleteLocation(location);

  const isAdmin = props.me.type === 'admin';

  return (
    <div>
      <ClientSingleNav
        client={selectedClient}
        reports={clientReports}
        locations={clientLocations}
      />
      <LocationList
        clientId={selectedClient.id}
        locations={clientLocations}
        onDelete={onDelete}
        isAdmin={isAdmin}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  clientsList: state.users.clients,
  locationsList: state.locations.list,
  reportsList: state.reports.list,
  me: state.users.me
});

export default connect(
  mapStateToProps,
  actions
)(ClientSingle);
