import React from 'react';
import Select from 'react-select';

const FilterSearchBar = props => (
  <div className="field has-addons">
    <div className="control has-icons-left has-icons-right vd-report-search">
      <input
        className="input"
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="icon is-small is-left">
        <i className="fas fa-search" />
      </span>
    </div>
    {props.dropdowns
      ? props.dropdowns.map(({ value, onChange, options, placeholder }, index) => (
          <Select
            key={index}
            className="vd-search-select is-marginless"
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
          />
        ))
      : null}
  </div>
);

export default FilterSearchBar;
