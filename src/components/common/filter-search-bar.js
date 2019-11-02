import React from 'react';

const FilterSearchBar = props => (
  <div className="field has-addons">
    <p className="control has-icons-left has-icons-right vd-report-search">
      <input
        className="input"
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="icon is-small is-left">
        <i className="fas fa-search" />
      </span>
    </p>
  </div>
);

export default FilterSearchBar;
