import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import emptyProfile from '../../img/empty-profile.jpg';

import routes from '../../../config/routes';
import InfoTile from '../common/info-tile';

const ClientSingleNav = props => (
  <div className="columns">
    <div className="column">
      <nav className="level">
        <div className="level-item">
          <figure className="image is-96x96 vd-profile-picture">
            <img src={props.client.img || emptyProfile} alt="Client" />
          </figure>
        </div>

        <div className="level-item">
          <h2 className="title is-2 has-text-grey">{props.client.name}</h2>
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

class ClientSingle extends Component {
  constructor(props) {
    super(props);

    this.client = null;
  }

  storesAreLoaded() {
    if (!this.props.clientsList) return false;
    if (!this.props.reportsList) return false;

    return true;
  }

  render() {
    const clientId = parseInt(this.props.match.params.id, 10);

    if (!this.storesAreLoaded()) return <div className="loader" />;

    this.selectedClient = this.props.clientsList.find(client => client.id === clientId);

    if (!this.selectedClient) return <Redirect to={`${routes.webRoot}/clients`} />;

    return (
      <div>
        <ClientSingleNav
          client={this.selectedClient}
          reports={this.props.reportsList.length}
          locations="0"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clientsList: state.users.clients,
  reportsList: state.reports.list
});

export default connect(mapStateToProps)(ClientSingle);
