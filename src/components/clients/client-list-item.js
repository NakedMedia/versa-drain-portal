import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../../config/routes';

import emptyProfile from '../../img/empty-profile.jpg';

const renderAdminOptions = (type, client) => {
  if (type !== 'admin') return null;

  return (
    <div className="media-right">
      <span className="icon has-text-primary is-large">
        <Link to={`${routes.webRoot}/clients/${client.id}/edit`}>
          <i className="fas fa-edit" />
        </Link>
      </span>

      <span className="icon has-text-primary is-large">
        <a
          onClick={() => {
            this.props.deleteUser(client);
          }}
        >
          <i className="fas fa-trash" />
        </a>
      </span>
    </div>
  );
};

const ClientListItem = ({ client, me }) => (
  <div className="box" key={client.id}>
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64 vd-profile-picture">
          <img src={client.img || emptyProfile} alt="Client" />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <Link to={`${routes.webRoot}/reports/${client.id}`}>{client.name}</Link>
            <br />
            <small>
              <strong>Client ID: </strong>#{client.id}
            </small>
          </p>
        </div>
      </div>
      {renderAdminOptions(me.type, client)}
    </article>
  </div>
);

export default ClientListItem;
