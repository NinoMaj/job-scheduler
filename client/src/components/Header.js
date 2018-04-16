import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import BackgroundChanger from './BackgroundChanger';
import featureFlags from '../config/featureFlags';

const Main = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 40px;
  height: 30px;
  width: 1000px;
  max-width: 85%; 

  @media (max-width: 768px) {
    max-width: 98%;
  }
`;

const LeftNav = styled.div`
`;

const RightNav = styled.ul`
  display: flex;
`;

const Logo = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
  font-size: 24px;
  font-weight: 500;
`;

const List = styled.ul`
  display: flex;
`;

const StyledLink = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
`;

const ListItem = styled.li`
  width: 70px;
  padding: 5px;
  list-style-type: none;
`;

const LoggedOutView = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <List>

        <ListItem>
          <StyledLink to="/login">
            Sign in
          </StyledLink>
        </ListItem>

        <ListItem>
          <StyledLink to="/register">
            Sign up
          </StyledLink>
        </ListItem>
      </List>
    );
  }
  return null;
};

const LoggedInView = ({ currentUser }) => {
  if (currentUser) {
    return (
      <List>

        <ListItem>
          <StyledLink to="/logout">
            Logout
          </StyledLink>
        </ListItem>

      </List>
    );
  }

  return null;
};

const Header = ({ currentUser, appName }) => (
  <Main>
    <LeftNav>
      <Logo to="/" data-testid="logo">
        {appName}
      </Logo>
    </LeftNav>
    <RightNav>
      {featureFlags.AUTH ? (
        <Fragment>
          <LoggedOutView currentUser={currentUser} />
          <LoggedInView currentUser={currentUser} />
        </Fragment>
      ) : (
        null
      )}
      {featureFlags.BACKGROUND_CHANGER ? (
        <BackgroundChanger />
      ) : (
        null
      )}
    </RightNav>
  </Main>
);

Header.propTypes = {
  appName: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

Header.defaultProps = {
  currentUser: null,
};

LoggedInView.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

LoggedInView.defaultProps = {
  currentUser: null,
};

LoggedOutView.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

LoggedOutView.defaultProps = {
  currentUser: null,
};

export default Header;
