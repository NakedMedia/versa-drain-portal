import React, { Component } from 'react';

import FilterSearchBar from './filter-search-bar';
import ReportListItem from './report-list-item';

class ReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      employeeId: null,
      clientId: null,
      locationId: null
    };
  }

  getDropdowns() {
    const dropdowns = [
      this.makeEmployeeDropdown(),
      this.makeClientDropdown(),
      this.makeLocationDropdown()
    ];

    // Filter null values
    return dropdowns.filter(dropdown => !!dropdown);
  }

  makeEmployeeDropdown() {
    if (!this.props.employees) return null;

    const options = this.props.employees.map(employee => ({
      value: employee.id,
      label: `#${employee.id} - ${employee.name}`
    }));

    return {
      value: this.state.employeeId,
      placeholder: 'Select Technician',
      options,
      onChange: option => this.setState({ employeeId: option ? option.value : null })
    };
  }

  makeClientDropdown() {
    if (!this.props.clients) return null;

    const options = this.props.clients.map(client => ({
      value: client.id,
      label: `#${client.id} - ${client.name}`
    }));

    return {
      value: this.state.clientId,
      options,
      placeholder: 'Select Client',
      onChange: option => this.setState({ clientId: option ? option.value : null })
    };
  }

  makeLocationDropdown() {
    if (!this.props.locations) return null;

    const options = this.props.locations.map(location => ({
      value: location.id,
      label: `#${location.id} - ${location.name}`
    }));

    return {
      value: this.state.locationId,
      options,
      placeholder: 'Select Location',
      onChange: option => this.setState({ locationId: option ? option.value : null })
    };
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  searchReports(reports) {
    return reports.filter(
      report =>
        (report.client.id === this.state.clientId || !this.state.clientId) &&
        (report.employee.id === this.state.employeeId || !this.state.employeeId) &&
        report.description.toLowerCase().includes(this.state.search)
    );
  }

  renderListItems() {
    if (!this.props.reports) return <div className="loader" />;

    const filteredReports = this.searchReports(this.props.reports);

    const reportListItems = filteredReports.map((report, index) => {
      const onEdit =
        this.props.isAdmin && this.props.onEdit ? () => this.props.onEdit(report) : null;

      const onDelete =
        this.props.isAdmin && this.props.onDelete ? () => this.props.onDelete(report) : null;

      return (
        <ReportListItem
          key={index}
          employee={report.employee}
          client={report.client}
          location={report.location}
          description={report.description}
          date={report.date}
          imgs={report.media_urls}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    });

    if (reportListItems.length === 0) return <h3>No Reports Found</h3>;

    return reportListItems;
  }

  render() {
    return (
      <div>
        <FilterSearchBar
          placeholder="Search Reports"
          onChange={this.handleSearch.bind(this)}
          dropdowns={this.getDropdowns()}
        />
        {this.renderListItems()}
      </div>
    );
  }
}

export default ReportList;
