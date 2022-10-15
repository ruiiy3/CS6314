import React, { Component } from 'react';
import Videos from './videos';

class VideoInfo extends React.Component {
  render() {
    /*
    const product = this.props.product;
    const name = product.available ?
      product.title :
      <span style={{ color: 'red' }}>
        {product.title}
      </span>;
      */
    return (
     <Videos videos = {this.props.info}/>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const availableOnly = this.props.availableOnly;

    const rows = [];

    this.props.videosList.forEach((v) => {
      if (v.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      if (availableOnly && !v.available) {
        return;
      }
      rows.push(
        <VideoInfo
          info={v}
          
        />
      );
    });

    return (
      <div>
        <h1>Video List</h1>
        {rows}
      </div>

    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.availableOnlys}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show available videos
        </p>
      </form>
    );
  }
}

class FilterableVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      availableOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(availableOnly) {
    this.setState({
      availableOnly: availableOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          availableOnly={this.state.availableOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          videosList= {this.props.videosList}
          filterText={this.state.filterText}
          availableOnly={this.state.availableOnly}
        />
      </div>
    );
  }
}
class App extends Component {

  state = {
    videos: []
  }
  componentDidMount() {
    fetch('videos.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ videos: data })
        console.log(this.state.videos)
      })
      .catch(console.log)
  }
  render() {
    return (
      <FilterableVideos videosList={this.state.videos} />
    );

  }
}

export default App;