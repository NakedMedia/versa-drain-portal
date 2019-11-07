import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterSearchBar from '../common/filter-search-bar';
import ListItem from '../common/list-item';

import routes from '../../../config/routes';

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

  searchClients(clientsList) {
    return clientsList.filter(
      client =>
        client.id.toString().startsWith(this.state.search) ||
        client.name.toLowerCase().startsWith(this.state.search)
    );
  }

  renderListItems() {
    if (!this.props.clientsList || !this.props.me) return <div className="loader" />;

    const filteredClients = this.searchClients(this.props.clientsList);

    const clientListItems = filteredClients.map(client => (
      <ListItem
        key={client.id}
        img={client.img}
        title={client.name}
        link={`${routes.webRoot}/clients/${client.id}`}
        fields={{ 'Client ID': `#${client.id}` }}
        onDelete={() => this.props.deleteUser(client)}
      />
    ));

    if (clientListItems.length === 0) return <h3>No Clients Found</h3>;

    return clientListItems;
  }

  render() {
    return (
      <div>
        <FilterSearchBar placeholder="Search Clients" onChange={this.handleSearch.bind(this)} />
        {this.renderListItems()}
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
