import React from 'react';

import ImageCard from './ImageCard';

function ImageGrid({ images }) {
  return (
    <div className="ui grid container">
      {images.map(image => (
        <div key={image.id} className="four wide column">
          <ImageCard image={image} />
        </div>
      ))}
    </div>
  );
}

ImageGrid.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ImageGrid;
