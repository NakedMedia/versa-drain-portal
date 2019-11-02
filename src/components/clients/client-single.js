import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import emptyProfile from '../../img/empty-profile.jpg';

import routes from '../../../config/routes';

import InfoTile from '../common/info-tile';
import FilterSearchBar from '../common/filter-search-bar';

const storesAreLoaded = props => {
  if (!props.clientsList) return false;
  if (!props.locationsList) return false;
  if (!props.reportsList) return false;

  return true;
};

const ClientSingleNav = props => (
  <div className="columns">
    <div className="column">
      <nav className="level" style={{ height: '100%' }}>
        <div className="level-item">
          <figure className="image is-64x64 vd-profile-picture">
            <img src={props.client.img || emptyProfile} alt="Client" />
          </figure>
        </div>

        <div className="level-item">
          <h3 className="title is-3 has-text-grey">{props.client.name}</h3>
        </div>
      </nav>
    </div>
    <div className="column">
      <InfoTile icon="clipboard" content={props.reports} name="Reports" />
    </div>
    <div className="column">
      <InfoTile icon="building" content={props.locations} name="Locations" />
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

  return (
    <div>
      <ClientSingleNav
        client={selectedClient}
        reports={clientReports.length}
        locations={clientLocations.length}
      />
      <FilterSearchBar placeholder="Search Locations" />
    </div>
  );
};

const mapStateToProps = state => ({
  clientsList: state.users.clients,
  locationsList: state.locations.list,
  reportsList: state.reports.list
});

export default connect(mapStateToProps)(ClientSingle);
