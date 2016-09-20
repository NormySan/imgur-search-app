import React, { Component } from 'react';
import Modal from 'react-modal';

function formatGalleryTypeIcon(image) {
  const galleryTypeIcon = (image.type === 'album') ? 'camera retro icon' : 'image icon';
  return (<i className={galleryTypeIcon} />);
}

function formatGalleryType(image) {
  return (image.type === 'album') ? 'Album' : 'Image';
}

function formatExtras(image) {
  const galleryType = formatGalleryType(image);
  const galleryTimeIcon = formatGalleryTypeIcon(image);

  if (image.type === 'album') {
    return (
      <div className="extra content">
        <span className="right floated">
          <i className="hashtag icon" />
          {image.imageCount}
        </span>
        <span>
          {galleryTimeIcon}
          {galleryType}
        </span>
      </div>
    );
  }

  return (
    <div className="extra content">
      <span>
        {galleryTimeIcon}
        {galleryType}
      </span>
    </div>
  );
}

class ImageCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsLoading: false,
      modalIsOpen: false,
      modalData: null,
    };
  }

  onGalleryClick() {
    if (this.props.image.type === 'album') {
      this.getAlbumDetails();
    }
  }

  getAlbumDetails() {
    this.setState({
      modalIsOpen: true,
      modalIsLoading: true,
    });

    fetch(`/api/album/${this.props.image.id}`).then((response) => {
      response.json().then((json) => {
        console.log(json.data);
        this.setState({
          modalData: json.data,
          modalIsLoading: false,
        });
      });
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  renderModalContent() {
    if (this.state.modalIsLoading || !this.state.modalData) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      );
    }

    return (
      <Modal isOpen={this.state.modalIsOpen}>
        <div className="ui modal">
          <div className="header">{this.state.modalData.title}</div>
          <div className="content">
            <p>Nulla vitae elit libero, a pharetra augue.</p>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <a href="#" className="c-image-card ui card" onClick={() => this.onGalleryClick()}>
        <div className="image">
          <img src={this.props.image.src} alt={this.props.image.title} />
        </div>
        <div className="content">
          <div className="head">{this.props.image.title}</div>
        </div>
        {formatExtras(this.props.image)}
        <Modal isOpen={this.state.modalIsOpen}>
          {this.renderModalContent()}
        </Modal>
      </a>
    );
  }
}

ImageCard.propTypes = {
  image: React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    src: React.PropTypes.string,
    type: React.PropTypes.string,
  }),
};

export default ImageCard;
