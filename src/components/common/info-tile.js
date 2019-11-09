import React from 'react';

const InfoTile = ({ icon, content, name }) => (
  <div className="notification is-primary vd-box-shadow" style={{ height: '100%' }}>
    <div className="level is-mobile" style={{ height: '100%' }}>
      <div className="level-left">
        <span className="icon is-large">
          <i className={`fa fa-3x fa-${icon}`} />
        </span>
      </div>
      <div className="level-right level-vertical">
        {content !== undefined ? <h2 className="title is-2">{content}</h2> : null}
        <h4 className="subtitle is-4">{name}</h4>
      </div>
    </div>
  </div>
);

export default InfoTile;
