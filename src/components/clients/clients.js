import React from 'react';
import { connect } from 'react-redux';

import ClientList from '../common/client-list';

import * as actions from '../../actions';

const Clients = props => {
  if (!props.clientsList || !props.me) return <div className="loader" />;

  return <ClientList clients={props.clientsList} />;
};

function mapStateToProps(state) {
  return {
    me: state.users.me,
    clientsList: state.users.clients
  };
}

export default connect(
  mapStateToProps,
  actions
)(Clients);
