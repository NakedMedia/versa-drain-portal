import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClientListItem from './client-list-item';

import * as actions from '../../actions';

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  renderClientListItems(clients) {
    if (!this.props.clientsList || !this.props.me) return <div className="loader" />;

    const filteredComponents = clients
      .filter(
        client =>
          client.id.toString().startsWith(this.state.search) ||
          client.name.toLowerCase().startsWith(this.state.search)
      )
      .map(client => <ClientListItem key={client.id} client={client} me={this.props.me} />);

    if (filteredComponents.length === 0) return <h3>No Clients Found</h3>;

    return filteredComponents;
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
        {this.renderClientListItems(this.props.clientsList)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    me: state.users.me,
    reportsList: state.reports.list,
    clientsList: state.users.clients
  };
}

export default connect(
  mapStateToProps,
  actions
)(Clients);
