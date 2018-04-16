import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

import config from '../../config/uiConfig';

Enzyme.configure({ adapter: new Adapter() });

test.skip('app name in logo', () => {
  const wrapper = shallow(<Header appName={config.APP_NAME} />);
  const logo = wrapper.querySelector('[data-testid="logo"]');
  console.log(logo)
  expect(logo.text()).toEqual(config.APP_NAME);
});

