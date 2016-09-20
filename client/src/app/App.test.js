/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';

import App from './App';

it('should render without crashing', () => {
  shallow(<App />, document.createElement('div'));
});
