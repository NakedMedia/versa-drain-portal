import React from 'react';
import moment from 'moment';

import emptyProfile from '../../img/empty-profile.jpg';

const renderReportImages = mediaUrls => {
  if (!mediaUrls) return null;

  return (
    <div className="media-right">
      {mediaUrls.map((media, index) => (
        <a key={index} href={media}>
          <span className="icon is-medium has-text-primary">
            <i className="fa fa-lg fa-image" />
          </span>
          <br />
        </a>
      ))}
    </div>
  );
};

const renderAdminOptions = (onDelete, onEdit) => {
  if (!onDelete && !onEdit) return null;

  return (
    <div>
      {onEdit ? (
        <span className="icon has-text-primary is-small">
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

const ReportListItem = ({ description, employee, client, date, imgs, ...props }) => {
  return (
    <div className="box">
      <nav className="level is-mobile">
        <div className="level-left">
          <figure className="level-item image is-48x48 vd-profile-picture">
            <img src={employee.img || emptyProfile} alt="User" />
          </figure>
          <p className="level-item has-text-grey">{employee.name}</p>
        </div>
        <div className="level-left level-vertical is-hidden-mobile">
          <p className="has-text-grey-light is-size-7">{moment(date).format('lll')}</p>
        </div>
        <div className="level-right">
          <p className="level-item has-text-grey">{client.name}</p>
          <figure className="level-item image is-48x48 vd-profile-picture is-marginless">
            <img src={client.img || emptyProfile} alt="User" />
          </figure>
        </div>
      </nav>
      <hr />
      <div className="media has-text-grey">
        <div className="media-content">
          <p>{description}</p>
        </div>
        {renderReportImages(imgs)}
      </div>
      {renderAdminOptions(props.onDelete, props.onEdit)}
    </div>
  );
};

export default ReportListItem;
