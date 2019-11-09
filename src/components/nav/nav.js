import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../../config/routes';

import logo from '../../img/logo.png';

function renderNewEmployee(type) {
  if (type !== 'admin') return null;

  return (
    <NavLink
      activeClassName="is-active"
      className="navbar-item is-tab"
      to={`${routes.webRoot}/technicians/new`}
    >
      <span className="icon is-medium">
        <i className="fas fa-wrench" />
      </span>
      <span>Create Technician</span>
    </NavLink>
  );
}

function renderNewClient(type) {
  if (type !== 'admin') return null;

  return (
    <NavLink
      activeClassName="is-active"
      className="navbar-item is-tab"
      to={`${routes.webRoot}/clients/new`}
    >
      <span className="icon is-medium">
        <i className="fas fa-briefcase" />
      </span>
      <span>Create Client</span>
    </NavLink>
  );
}

function renderNewLocation(type) {
  if (type !== 'admin') return null;

  return (
    <NavLink
      activeClassName="is-active"
      className="navbar-item is-tab"
      to={`${routes.webRoot}/locations/new`}
    >
      <span className="icon is-medium">
        <i className="fas fa-building" />
      </span>
      <span>Create Location</span>
    </NavLink>
  );
}

function renderNewReport(type) {
  if (type === 'client') return null;

  return (
    <NavLink
      activeClassName="is-active"
      className="navbar-item is-tab"
      to={`${routes.webRoot}/reports/new`}
    >
      <span className="icon is-medium">
        <i className="fas fa-clipboard" />
      </span>
      <span>Create Report</span>
    </NavLink>
  );
}

const Nav = props => {
  if (!props.user) return null;

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand is-marginless">
        <NavLink className="navbar-item" to={routes.webRoot}>
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>
      <div className="navbar-end">
        {renderNewEmployee(props.user.type)}
        {renderNewClient(props.user.type)}
        {renderNewLocation(props.user.type)}
        {renderNewReport(props.user.type)}
      </div>
    </nav>
  );
};

export default Nav;
