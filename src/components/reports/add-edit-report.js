/* eslint camelcase:0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withRouter from 'react-router-dom/es/withRouter';
import Select from 'react-select';

import routes from '../../../config/routes';

import * as actions from '../../actions';

class AddEditReport extends Component {
  constructor(props) {
    super(props);

    let selectedReport = {
      description: '',
      media_ids: [],
      media_urls: [],
      employee: {},
      client: {},
      location: {}
    };

    if (props.match.params.id && props.reportsList) {
      selectedReport = props.reportsList.find(
        report => report.id === parseInt(props.match.params.id, 10)
      );
    }

    this.state = {
      description: selectedReport.description,
      media_ids: selectedReport.media_ids,
      media_urls: selectedReport.media_urls,
      employee_id: selectedReport.employee.id,
      client_id: selectedReport.client.id,
      location_id: selectedReport.location.id,
      availableLocations: props.locations
        ? props.locations.filter(loc => loc.client.id === selectedReport.client.id)
        : [],
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    let selectedReport = {
      description: '',
      media_ids: [],
      media_urls: [],
      employee: {},
      client: {},
      location: {}
    };

    if (newProps.match.params.id && newProps.reportsList) {
      selectedReport = newProps.reportsList.find(
        report => report.id === parseInt(newProps.match.params.id, 10)
      );
    }

    this.state = {
      description: selectedReport.description,
      media_ids: selectedReport.media_ids,
      media_urls: selectedReport.media_urls,
      employee_id: selectedReport.employee.id,
      client_id: selectedReport.client.id,
      location_id: selectedReport.location.id,
      availableLocations: newProps.locations
        ? newProps.locations.filter(loc => loc.client.id === selectedReport.client.id)
        : [],
      errors: {}
    };
  }

  handleCancel() {
    this.props.history.go(-1);
  }

  handleFile(e) {
    this.setState({ errors: {} });

    function getExtension(filename) {
      const parts = filename.split('.');
      return parts[parts.length - 1];
    }

    function isImage(filename) {
      const ext = getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
          //etc
          return true;

        default:
          return false;
      }
    }

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    if (!isImage(file.name)) {
      return this.setState({
        errors: { message: 'The selected file is not a supported image' }
      });
    }

    this.setState({ isUploading: true });

    this.props.uploadImage(formData).then(action => {
      this.setState({
        isUploading: false,
        media_ids: [...this.state.media_ids, action.payload.data.media_id],
        media_urls: [...this.state.media_urls, action.payload.data.media_url]
      });
    });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleClientChange(option) {
    const client_id = option ? option.value : null;
    const availableLocations = this.props.locations.filter(loc => loc.client.id === client_id);

    this.setState({ client_id, location_id: null, availableLocations });
  }

  deleteImage(index) {
    this.setState({
      media_ids: this.state.media_ids.filter((id, i) => i !== index),
      media_urls: this.state.media_urls.filter((url, i) => i !== index)
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const description = this.state.description;
    const client_id = this.state.client_id;
    const employee_id = this.props.me.type === 'admin' ? this.state.employee_id : this.props.me.id;
    const location_id = this.state.location_id;
    const media_ids = this.state.media_ids;

    if (!client_id || !employee_id || !location_id || !description) {
      return this.setState({
        errors: {
          ...this.state.errors,
          client_id: !client_id,
          employee_id: !employee_id,
          location_id: !location_id,
          description: !description,
          message:
            !client_id || !employee_id || location_id || !description
              ? 'The fields in red are required'
              : ''
        }
      });
    }

    this.setState({ isLoading: true });

    const selectedReportId = this.props.match.params.id;

    const report = {
      // ID will be null if no selected report
      id: selectedReportId,
      description,
      employee_id,
      client_id,
      location_id,
      media_ids
    };

    if (selectedReportId) {
      return this.props.updateReport(report).then(res => {
        if (res.payload.status === 200) this.setState({ finished: true });
        else this.setState({ isLoading: false });
      });
    }

    return this.props.createReport(report).then(res => {
      if (res.payload.status === 200) this.setState({ finished: true });
      else this.setState({ isLoading: false });
    });
  }

  renderOptions(items) {
    if (!items || items.length === 0) return [];

    return items.map(item => ({
      value: item.id,
      label: `#${item.id} - ${item.name}`
    }));
  }

  renderEmployeeSelect(type) {
    if (type !== 'admin') return null;

    return (
      <Select
        name="employee"
        value={this.state.employee_id}
        options={this.renderOptions(this.props.employees)}
        onChange={option => this.setState({ employee_id: option ? option.value : null })}
        placeholder="Select employee"
        className={`vd-search-select ${this.state.errors.employee_id ? 'is-danger' : ''}`}
      />
    );
  }

  renderImages(urls) {
    if (urls.length === 0) return null;

    return urls.map((url, index) => (
      <div key={index} className="control">
        <div className="box vd-image-box" style={{ backgroundImage: `url(${url})` }}>
          <a className="delete" onClick={() => this.deleteImage(index)} />
        </div>
      </div>
    ));
  }

  renderAddImage() {
    if (!this.state.isUploading) {
      return (
        <div className="control">
          <input
            className="file-input"
            type="file"
            ref="file"
            onChange={this.handleFile.bind(this)}
          />
          <div
            className="box vd-image-box has-cursor-pointer"
            onClick={() => {
              this.refs.file.click();
            }}
          >
            <span className="icon is-large has-text-primary">
              <i className="fa fa-lg fa-plus" />
            </span>
            <span className="file-label has-text-grey-dark">Add Image</span>
          </div>
        </div>
      );
    }

    return (
      <div className="control">
        <div className="box vd-image-box">
          <div className="loader" />
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.me) return <div className="loader" />;
    if (this.state.finished) return <Redirect to={`${routes.webRoot}/reports`} />;

    return (
      <form className="form">
        <div className="field">
          <div className="control">
            <textarea
              ref="description"
              rows="16"
              onChange={this.handleDescriptionChange.bind(this)}
              className={`textarea vd-box-shadow ${
                this.state.errors.description ? 'is-danger' : ''
              }`}
              value={this.state.description}
              placeholder="Enter report description"
            />
          </div>
        </div>

        <div className="field">
          {this.renderEmployeeSelect(this.props.me.type)}

          <Select
            name="client"
            value={this.state.client_id}
            options={this.renderOptions(this.props.clients)}
            onChange={this.handleClientChange.bind(this)}
            placeholder="Select client"
            className={`vd-search-select ${this.state.errors.client_id ? 'is-danger' : ''}`}
          />

          <Select
            name="location"
            disabled={this.state.availableLocations.length === 0}
            value={this.state.location_id}
            options={this.renderOptions(this.state.availableLocations)}
            onChange={option => this.setState({ location_id: option ? option.value : null })}
            placeholder="Select location"
            className={`vd-search-select ${this.state.errors.location_id ? 'is-danger' : ''}`}
          />
        </div>
        <div className="field is-grouped is-grouped-multiline">
          {this.renderImages(this.state.media_urls)}
          {this.renderAddImage()}
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              onClick={this.handleSubmit.bind(this)}
              type="submit"
              className={`button is-primary ${this.state.isLoading ? 'is-loading' : ''}`}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <a onClick={this.handleCancel.bind(this)} className="button is-text">
              Cancel
            </a>
          </div>
        </div>
        <p className="help is-danger">{this.state.errors.message}</p>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    me: state.users.me,
    reportsList: state.reports.list,
    employees: state.users.employees,
    clients: state.users.clients,
    locations: state.locations.list
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(AddEditReport)
);
