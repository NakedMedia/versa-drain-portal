import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import ClientList from './client-list';

import routes from '../../../config/routes';

import * as actions from '../../actions';

const Clients = props => {
  if (!props.clientsList || !props.me) return <div className="loader" />;
  if (props.me.type === 'client') return <Redirect to={`${routes.webRoot}/dashboard`} />;

  const onEdit = client => props.history.push(`${routes.webRoot}/clients/${client.id}/edit`);
  const onDelete = client => props.deleteUser(client);

  const isAdmin = props.me.type === 'admin';

  return (
    <ClientList clients={props.clientsList} onEdit={onEdit} onDelete={onDelete} isAdmin={isAdmin} />
  );
};

function mapStateToProps(state) {
  return {
    me: state.users.me,
    clientsList: state.users.clients
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Clients)
);
