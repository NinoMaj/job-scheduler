import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'material-ui/SvgIcon';


const SortIcon = (props) => (
  <SvgIcon {...props} style={{fontSize: '32px'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #35314B">
      <path d="M8 10v4h4l-6 7-6-7h4v-4h-4l6-7 6 7h-4zm16 5h-10v2h10v-2zm0 6h-10v-2h10v2zm0-8h-10v-2h10v2zm0-4h-10v-2h10v2zm0-4h-10v-2h10v2z"/>
    </svg>
  </SvgIcon>
);

SortIcon.propTypes = {
  props: PropTypes.object,
};

SortIcon.defaultProps = {
  props: {},
};

export default SortIcon;
