import React, { Component } from 'react';

import FilterSearchBar from '../common/filter-search-bar';
import ListItem from '../common/list-item';

import routes from '../../../config/routes';

class ClientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  searchClients(clients) {
    return clients.filter(
      client =>
        client.id.toString().startsWith(this.state.search) ||
        client.name.toLowerCase().startsWith(this.state.search)
    );
  }

  renderListItems() {
    const filteredClients = this.searchClients(this.props.clients);

    const clientListItems = filteredClients.map(client => (
      <ListItem
        key={client.id}
        img={client.img}
        title={client.name}
        link={`${routes.webRoot}/clients/${client.id}`}
        fields={{ 'Client ID': `#${client.id}` }}
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

export default ClientList;
