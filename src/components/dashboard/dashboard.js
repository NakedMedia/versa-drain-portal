import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import InfoTile from '../common/info-tile';

import routes from '../../../config/routes';

const Dashboard = props => {
  function renderReportTile(reportsList) {
    if (!reportsList) return null;

    return (
      <div className="column">
        <Link to={`${routes.webRoot}/reports`}>
          <InfoTile icon="clipboard" content={reportsList.length} name="Reports" />
        </Link>
      </div>
    );
  }

  function renderClientTile(clientList) {
    if (!clientList) return null;

    return (
      <div className="column">
        <Link to={`${routes.webRoot}/clients`}>
          <InfoTile icon="briefcase" content={clientList.length} name="Clients" />
        </Link>
      </div>
    );
  }

  function renderTechincianTile(employees) {
    if (!props.me || props.me.type === 'employee') return null;
    if (!employees) return null;

    return (
      <div className="column">
        <Link to={`${routes.webRoot}/technicians`}>
          <InfoTile icon="wrench" content={employees.length} name="Technicians" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="columns is-marginless">
        {renderReportTile(props.reportsList)}
        {renderClientTile(props.clients)}
        {renderTechincianTile(props.employees)}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    me: state.users.me,
    reportsList: state.reports.list,
    clients: state.users.clients,
    employees: state.users.employees
  };
}

export default connect(mapStateToProps)(Dashboard);
