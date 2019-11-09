import React, { Component } from 'react';

import FilterSearchBar from './filter-search-bar';
import ReportListItem from './report-list-item';

class ReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  handleSearch(e) {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  searchReports(reports) {
    return reports.filter(
      report =>
        (report.client.id === this.state.client || !this.state.client) &&
        (report.employee.id === this.state.employee || !this.state.employee) &&
        report.description.toLowerCase().includes(this.state.search)
    );
  }

  renderListItems() {
    if (!this.props.reports) return <div className="loader" />;

    const filteredReports = this.searchReports(this.props.reports);

    const reportListItems = filteredReports.map((report, index) => (
      <ReportListItem
        key={index}
        employee={report.employee}
        client={report.client}
        description={report.description}
        date={report.date}
        imgs={report.media_urls}
      />
    ));

    if (reportListItems.length === 0) return <h3>No Reports Found</h3>;

    return reportListItems;
  }

  render() {
    return (
      <div>
        <FilterSearchBar placeholder="Search Reports" onChange={this.handleSearch.bind(this)} />
        {this.renderListItems()}
      </div>
    );
  }
}

export default ReportList;
