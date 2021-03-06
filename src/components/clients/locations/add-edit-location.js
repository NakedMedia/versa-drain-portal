/* eslint camelcase:0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Select from 'react-select';

import * as actions from '../../../actions';
import routes from '../../../../config/routes';

class AddEditLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: props.match.params.clientId,
      errors: {}
    };
  }

  handleCancel() {
    this.props.history.go(-1);
  }

  handleSubmit(e) {
    e.preventDefault();

    const selectedLocationId = this.props.match.params.locationId;

    // Use ID from url if in edit mode
    const id = this.refs.id ? this.refs.id.value : selectedLocationId;
    const name = this.refs.name.value;
    const address = this.refs.address.value;
    const client_id = this.state.clientId;

    const contact_name = this.refs.contact_name.value;
    const email = this.refs.email.value;
    const phone = this.refs.phone.value;

    if (!id || !name || !client_id) {
      return this.setState({
        errors: {
          ...this.state.errors,
          id: !id,
          name: !name,
          client_id: !client_id,
          message: !id || !name || !client_id ? 'The fields in red are required' : ''
        }
      });
    }

    // Check for duplicate locations if not in edit mode
    if (
      !selectedLocationId &&
      this.props.locations.find(location => location.id === parseInt(id, 10))
    ) {
      return this.setState({
        errors: {
          id: true,
          message: 'Another location with that ID already exists'
        }
      });
    }

    this.setState({ isLoading: true });

    const locationData = {
      id,
      name,
      address,
      client_id,
      contact_name,
      email,
      phone
    };

    // Update location if in update mode
    if (selectedLocationId) {
      return this.props.updateLocation(locationData).then(res => {
        if (res.payload.status === 200) this.props.history.go(-1);
        else this.setState({ isLoading: false });
      });
    }

    this.props.createLocation(locationData).then(res => {
      if (res.payload.status === 200) this.props.history.go(-1);
      else this.setState({ isLoading: false });
    });
  }

  storesAreLoaded() {
    if (!this.props.clients) return false;
    if (!this.props.locations) return false;
    if (!this.props.me) return false;

    return true;
  }

  renderIdField() {
    // Return null if in edit mode
    if (this.props.match.params.locationId) return null;

    return (
      <div className="field is-grouped">
        <div className="control">
          <input
            type="text"
            className={`input ${this.state.errors.id ? 'is-danger' : ''}`}
            ref="id"
            placeholder="Enter location id"
          />
        </div>
      </div>
    );
  }

  render() {
    if (!this.storesAreLoaded()) return <div className="loader" />;

    if (this.props.me.type !== 'admin') {
      return <Redirect to={`${routes.webRoot}/dashboard`} />;
    }

    const { match, locations, clients } = this.props;

    const selectedLocation = match.params.locationId
      ? locations.find(location => location.id === parseInt(match.params.locationId, 10))
      : {};

    return (
      <div className="box">
        <form className="form">
          <h6 className="title is-6">Location Info</h6>
          {this.renderIdField()}
          <div className="field">
            <div className="control">
              <input
                type="text"
                className={`input ${this.state.errors.name ? 'is-danger' : ''}`}
                ref="name"
                placeholder="Enter location name"
                defaultValue={selectedLocation.name}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                type="text"
                className={`input ${this.state.errors.address ? 'is-danger' : ''}`}
                ref="address"
                placeholder="Enter location address"
                defaultValue={selectedLocation.address}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Select
                className={`vd-search-select is-marginless ${
                  this.state.errors.client_id ? 'is-danger' : null
                }`}
                value={this.state.clientId}
                options={clients.map(client => ({
                  value: client.id,
                  label: `#${client.id} - ${client.name}`
                }))}
                onChange={option => this.setState({ clientId: option ? option.value : null })}
                placeholder="Select Client"
              />
            </div>
          </div>
          <br />
          <h6 className="title is-6">Contact Info</h6>
          <div className="field">
            <div className="control">
              <input
                type="text"
                className={`input ${this.state.errors.contact_name ? 'is-danger' : ''}`}
                ref="contact_name"
                placeholder="Enter location contact name"
                defaultValue={selectedLocation.contact_name}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                type="text"
                className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                ref="email"
                placeholder="Enter location contact email"
                defaultValue={selectedLocation.email}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                type="text"
                className={`input ${this.state.errors.phone ? 'is-danger' : ''}`}
                ref="phone"
                placeholder="Enter location contact phone"
                defaultValue={selectedLocation.phone}
              />
            </div>
          </div>
          <br />
          <div className="field is-grouped">
            <div className="control">
              <button
                onClick={this.handleSubmit.bind(this)}
                type="submit"
                className={`button is-primary ${this.state.isLoading ? 'is-loading' : ''}`}
              >
                Submit
              </button>
            </div>
            <div className="control">
              <a onClick={this.handleCancel.bind(this)} className="button is-text">
                Cancel
              </a>
            </div>
          </div>
          <p className="help is-danger">{this.state.errors.message}</p>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clients: state.users.clients,
    locations: state.locations.list,
    me: state.users.me
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(AddEditLocation)
);
