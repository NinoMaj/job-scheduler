import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import featureFlags from '../config/featureFlags';
import { showNotification } from '../actions/uiActions';

const Container = styled.div`
  display: flex;
  text-align: center;
`;

const ShowNextBgColor = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid black;
  background: ${props => (props.isGradientBackground) ? '#CCCCCC' : 'linear-gradient(90deg, #6E77FC, #01FDB9)'};
  opacity: ${props => (props.isGradientBackground) ? '0.9' : '0.6'};

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Text = styled.span`
  color: #FFFFFF;
  font-size: 16px;
  text-align: center;
  line-height: 28px;
  font-weight: 700;
`;

class BackgroundChanger extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isGradientBackground: true };

    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
  }

  handleBackgroundChange() {
    document.body.classList.toggle('bodyBackgroundGray');
    this.setState({ isGradientBackground: !this.state.isGradientBackground });
    this.props.showNotification({
      message: 'I couldn\'t decide between backgrounds, so I kept both :)',
    });
  }

  render() {
    return (
      <Fragment>
        {featureFlags.BACKGROUND_CHANGER ? (
          <Container>
            <ShowNextBgColor
              isGradientBackground={this.state.isGradientBackground}
              onClick={this.handleBackgroundChange}
            >
              <Text>BG</Text>
            </ShowNextBgColor>
          </Container>
        ) : (
          null
        )}
      </Fragment>
    );
  }
}

BackgroundChanger.propTypes = {
  showNotification: PropTypes.func.isRequired,
};


export default connect(null, { showNotification })(BackgroundChanger);
