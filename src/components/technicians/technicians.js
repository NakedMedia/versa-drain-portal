import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import TechnicianList from './technician-list';

import routes from '../../../config/routes';

import * as actions from '../../actions';

const Technicians = props => {
  if (!props.employees || !props.me) return <div className="loader" />;
  if (props.me.type === 'employee') return <Redirect to={`${routes.webRoot}/dashboard`} />;

  const onEdit = employee =>
    props.history.push(`${routes.webRoot}/technicians/${employee.id}/edit`);

  const onDelete = employee => props.deleteUser(employee);

  const isAdmin = props.me.type === 'admin';

  return (
    <TechnicianList
      employees={props.employees}
      onEdit={onEdit}
      onDelete={onDelete}
      isAdmin={isAdmin}
    />
  );
};

function mapStateToProps(state) {
  return {
    employees: state.users.employees,
    me: state.users.me
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Technicians)
);
