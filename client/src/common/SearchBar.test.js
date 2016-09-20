/* eslint-env jest */

import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import SearchBar from './SearchBar.jsx';

describe('SearchBar', () => {
  const noop = () => {};
  let div;

  beforeEach(() => {
    div = document.createElement('div');
  });

  it('should render without crashing', () => {
    mount(<SearchBar onSearchTermChange={noop} />, div);
  });

  it('should display a custom placeholder text', () => {
    const wrapper = mount(<SearchBar
      onSearchTermChange={noop}
      placeholder="Placeholder Test"
    />, div);

    expect(wrapper.find({ placeholder: 'Placeholder Test' }).length).toEqual(1);
  });

  it('should notify about changes to the search term', () => {
    const onChange = sinon.spy();
    const wrapper = mount(<SearchBar onSearchTermChange={onChange} />, div);

    wrapper.find('input').simulate('change');
    expect(onChange.called).toBe(true);
  });
});
