import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Notification from '../components/Notification';
import featureFlags from '../config/featureFlags';
import uiConfig from '../config/uiConfig';
import { onLoad, onRedirect, removeNotification } from '../actions/uiActions';
import Home from './Home';
import UnderConstruction from './UnderConstruction';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationRemovalJobs: [],
    };

    this.handleNotificationClose = this.handleNotificationClose.bind(this);
  }

  componentDidMount() {
    // TODO: imeplement auth
    const token = window.localStorage.getItem('jwt');
    this.props.onLoad(token);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    // If new notification has been added, schedule removal job
    if (prevProps.notifications && this.props.notifications.length > prevProps.notifications.length) {
      this.scheduleNotificationRemoval(this.props.notifications[0].id, this.props.notifications[0].duration);
    }
  }

  scheduleNotificationRemoval(id, duration) {
    const timeoutId = setTimeout(() => this.props.removeNotification(), duration);
    const newState = [...this.state.notificationRemovalJobs, { timeoutId, id }];
    this.setState({
      notificationRemovalJobs: newState,
    });
  }

  auth() {
    if (featureFlags.AUTH) {
      return [
        <Route exact path="/register" key={1} component={UnderConstruction} />,
        <Route exact path="/login" key={2} component={UnderConstruction} />,
        <Route exact path="/logout" key={3} component={UnderConstruction} />,
      ];
    }

    return null;
  }

  handleNotificationClose(event, reason, id) {
    if (reason === 'clickaway') {
      return;
    }

    // Notification has been removed manually so we need to delete scheduled job
    const notificationRemovalJob = this.state.notificationRemovalJobs.find(notification => notification.id === id);
    clearTimeout(notificationRemovalJob.timeoutId);
    const newState = this.state.notificationRemovalJobs.filter(notification => notification.id !== id);
    this.setState({
      notificationRemovalJobs: newState,
    });
    this.props.removeNotification();
  }

  render() {
    return (
      <div>
        <Header
          currentUser={this.props.currentUser}
          appName={uiConfig.APP_NAME}
        />
        {this.props.appLoaded ? (
          <Switch>
            <Route exact path="/" component={Home} />
            {this.auth()};
          </Switch>
          ) : (
            null
          )
        }
        <Notification notifications={this.props.notifications} onClose={this.handleNotificationClose} />
      </div>
    );
  }
}

App.propTypes = {
  onLoad: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  appLoaded: PropTypes.bool.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    message: PropTypes.string,
    duration: PropTypes.number,
  })),
  removeNotification: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

App.defaultProps = {
  redirectTo: null,
  currentUser: null,
  notifications: [],
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  appLoaded: state.ui.appLoaded,
  redirectTo: state.ui.redirectTo,
  notifications: state.ui.notifications,
  currentUser: state.ui.currentUser,
});

export default connect(mapStateToProps, { onLoad, onRedirect, removeNotification })(App);
