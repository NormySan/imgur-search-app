// Import dependencies.
import React, { Component } from 'react';
import debounce from 'lodash/debounce';

import Header from './Header';
import SearchBar from '../common/SearchBar';
import ImageGrid from '../image/ImageGrid';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loading: false,
    };
  }

  performImageSearch(term) {
    this.setState({ loading: true });

    fetch(`/api/search?q=${term}`).then((response) => {
      response.json().then((json) => {
        this.setState({
          images: json.data,
          loading: false,
        });
      });
    });
  }

  render() {
    const imageSearch = debounce((term) => {
      this.performImageSearch(term);
    }, 300);

    return (
      <div>
        <div className="ui container">
          <Header />
        </div>
        <div className="ui container">
          <SearchBar
            onSearchTermChange={imageSearch}
            placeholder="Search images"
            displayLoader={this.state.loading}
          />
        </div>
        <ui className="container">
          <ImageGrid images={this.state.images} />
        </ui>
      </div>
    );
  }
}

export default App;
