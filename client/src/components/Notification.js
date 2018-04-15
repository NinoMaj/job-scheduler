import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Notification = ({ notifications, onClose }) => {
  function handleClose(event, reason) {
    onClose(event, reason, notifications[0].id);
  }
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={Boolean(notifications.length)}
        onClose={handleClose}
        transitionDuration={200}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{notifications.length ? notifications[0].message : null}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    duration: PropTypes.number,
  })),
  onClose: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  notifications: [],
};

export default Notification;
