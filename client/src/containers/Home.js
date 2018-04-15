import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import AddJob from '../components/AddJob';
import Table from '../components/Table';
import Loading from '../components/Loading';
import { getJobs, addJob, deleteJob, removeErrors } from '../actions/jobsActions';
import { showNotification } from '../actions/uiActions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.getJobs();
  }

  componentDidUpdate() {
    // Show notification if there is a new error
    if (this.props.jobsErrors && this.props.jobsErrors.length) {
      this.props.showNotification({ message: this.props.jobsErrors[0].msg });
      this.props.removeErrors();
    }

    return true;
  }

  handleClickOpen() {
    this.setState({ isDialogOpen: true });
  }

  handleClose() {
    this.setState({ isDialogOpen: false });
  }

  render() {
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="Add job dialog"
          open={this.state.isDialogOpen}
        >
          <DialogTitle>Add New Job</DialogTitle>
          <AddJob
            closeAfterSaving={this.handleClose}
            addJob={this.props.addJob}
          />
        </Dialog>
        <Table
          jobs={this.props.jobs}
          deleteJob={this.props.deleteJob}
          handleClickOpen={this.handleClickOpen}
        />
        <Loading loading={this.props.jobLoading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jobLoading: state.jobs.loading,
  jobs: state.jobs.jobsList,
  jobsErrors: state.jobs.errors,
  redirectTo: state.ui.redirectTo,
});

Home.propTypes = {
  jobLoading: PropTypes.bool,
  jobs: PropTypes.arrayOf(PropTypes.object),
  getJobs: PropTypes.func.isRequired,
  jobsErrors: PropTypes.arrayOf(PropTypes.object),
  addJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  removeErrors: PropTypes.func.isRequired,
};

Home.defaultProps = {
  jobLoading: false,
  jobs: [],
  jobsErrors: null,
};

export default connect(mapStateToProps, {
  getJobs,
  addJob,
  deleteJob,
  showNotification,
  removeErrors,
})(Home);
