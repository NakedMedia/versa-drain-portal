import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import ReportList from './report-list';
import routes from '../../../config/routes';

const storesAreLoaded = props => {
  if (!props.employees) return false;
  if (!props.clients) return false;
  if (!props.locations) return false;
  if (!props.reports) return false;
  if (!props.me) return false;

  return true;
};

const Reports = props => {
  if (!storesAreLoaded(props)) return <div className="loader" />;

  const onEdit = report => props.history.push(`${routes.webRoot}/reports/${report.id}/edit`);
  const onDelete = report => props.deleteReport(report);

  const isAdmin = props.me.type === 'admin';

  return (
    <ReportList
      reports={props.reports}
      employees={props.employees}
      clients={props.clients}
      locations={props.locations}
      onEdit={onEdit}
      onDelete={onDelete}
      isAdmin={isAdmin}
    />
  );
};

function mapStateToProps(state) {
  return {
    me: state.users.me,
    employees: state.users.employees,
    clients: state.users.clients,
    locations: state.locations.list,
    reports: state.reports.list
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Reports)
);
