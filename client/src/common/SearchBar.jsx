import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value,
    });

    this.props.onSearchTermChange(event.target.value);
  }

  prepareClassName() {
    const className = ['ui', 'fluid', 'input', 'icon'];

    if (this.props.displayLoader) {
      className.push('loading');
    }

    return className.join(' ');
  }

  render() {
    const isDisabled = this.props.displayLoader;

    return (
      <div className={this.prepareClassName()}>
        <input
          id="search"
          name="search"
          type="search"
          className="form-control"
          placeholder={this.props.placeholder}
          value={this.state.term}
          onChange={this.onInputChange}
          autoFocus="autofocus"
          disabled={isDisabled}
        />
        <i className="search icon" />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearchTermChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
  displayLoader: React.PropTypes.bool,
};

export default SearchBar;
