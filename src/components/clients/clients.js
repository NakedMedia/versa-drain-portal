import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/es/withRouter';

import ClientList from './client-list';

import routes from '../../../config/routes';

import * as actions from '../../actions';

const Clients = props => {
  if (!props.clientsList || !props.me) return <div className="loader" />;

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
