import React, { Component } from 'react';

import routes from '../../../../config/routes';

import FilterSearchBar from '../../common/filter-search-bar';
import ListItem from '../../common/list-item';

class LocationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  searchLocations(locations) {
    return locations.filter(
      location =>
        location.id
          .toString()
          .toLowerCase()
          .startsWith(this.state.search) ||
        location.name.toLowerCase().startsWith(this.state.search) ||
        location.address.toLowerCase().startsWith(this.state.search)
    );
  }

  renderListItems() {
    const filteredLocations = this.searchLocations(this.props.locations);

    const locationListItems = filteredLocations.map(location => {
      const { clientId } = this.props;

      const fields = {
        'Location ID': `#${location.id}`,
        Address: <a href={`https://maps.google.com/?q=${location.address}`}>{location.address}</a>,
        'Contact Name': location.contact_name,
        'Contact Email': location.email,
        'Contact Phone': location.phone
      };

      const onEdit =
        this.props.isAdmin && this.props.onEdit ? () => this.props.onEdit(location) : null;

      const onDelete =
        this.props.isAdmin && this.props.onDelete ? () => this.props.onDelete(location) : null;

      return (
        <ListItem
          key={location.id}
          title={location.name}
          link={`${routes.webRoot}/clients/${clientId}/locations/${location.id}`}
          fields={fields}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    });

    if (locationListItems.length === 0) return <h3>No Locations Found</h3>;

    return locationListItems;
  }

  render() {
    return (
      <div>
        <FilterSearchBar placeholder="Search Locations" onChange={this.handleSearch.bind(this)} />
        {this.renderListItems()}
      </div>
    );
  }
}

export default LocationList;
