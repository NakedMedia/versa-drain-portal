import React from 'react';
import { Link } from 'react-router-dom';

import emptyProfile from '../../img/empty-profile.jpg';

const renderFields = fields => {
  if (!fields) return null;

  return (
    <small>
      {Object.keys(fields).map((key, i) => (
        <p key={i} className="is-marginless">
          <strong>{key}: </strong>
          {fields[key]}
        </p>
      ))}
    </small>
  );
};

const renderImage = img => {
  if (img === undefined) return null;

  return (
    <figure className="image is-64x64 vd-profile-picture">
      <img src={img || emptyProfile} role="presentation" />
    </figure>
  );
};

const renderTitle = (title, link) => {
  if (link) {
    return <Link to={link}>{title}</Link>;
  }

  return <strong>{title}</strong>;
};

const renderAdminOptions = (onDelete, onEdit) => {
  if (!onDelete && !onEdit) return null;

  return (
    <div className="media-right">
      {onEdit ? (
        <span className="icon has-text-primary is-large">
          <a onClick={onEdit}>
            <i className="fas fa-edit" />
          </a>
        </span>
      ) : null}

      {onDelete ? (
        <span className="icon has-text-primary is-large">
          <a onClick={onDelete}>
            <i className="fas fa-trash" />
          </a>
        </span>
      ) : null}
    </div>
  );
};

const ListItem = props => (
  <div className="box">
    <article className="media">
      <div className="media-left">{renderImage(props.img)}</div>
      <div className="media-content">
        <div className="content">
          <div>
            {renderTitle(props.title, props.link)}
            <br />
            {renderFields(props.fields)}
          </div>
        </div>
      </div>
      {renderAdminOptions(props.onDelete, props.onEdit)}
    </article>
  </div>
);

export default ListItem;
