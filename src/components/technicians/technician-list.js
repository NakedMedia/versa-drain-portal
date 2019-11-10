import React, { Component } from 'react';

import FilterSearchBar from '../common/filter-search-bar';
import ListItem from '../common/list-item';

class TechnicianList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  searchEmployees(employees) {
    return employees.filter(
      employee =>
        employee.id.toString().startsWith(this.state.search) ||
        employee.name.toLowerCase().startsWith(this.state.search) ||
        employee.email.toLowerCase().startsWith(this.state.search) ||
        employee.phone.toLowerCase().startsWith(this.state.search)
    );
  }

  renderListItems() {
    const filteredEmployees = this.searchEmployees(this.props.employees);

    const employeeListItems = filteredEmployees.map(employee => {
      const fields = {
        'Technician ID': `#${employee.id}`,
        Phone: employee.phone,
        Email: employee.email
      };

      const onEdit =
        this.props.isAdmin && this.props.onEdit ? () => this.props.onEdit(employee) : null;

      const onDelete =
        this.props.isAdmin && this.props.onDelete ? () => this.props.onDelete(employee) : null;

      return (
        <ListItem
          key={employee.id}
          title={employee.name}
          img={employee.img}
          fields={fields}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    });

    if (employeeListItems.length === 0) return <h3>No Technicians Found</h3>;

    return employeeListItems;
  }

  render() {
    return (
      <div>
        <FilterSearchBar placeholder="Search Technicians" onChange={this.handleSearch.bind(this)} />
        {this.renderListItems()}
      </div>
    );
  }
}

export default TechnicianList;
