import React from 'react';
import PropTypes from 'prop-types';

function FeaturedImage(props) {
  const {
    image, 
    imageSize,
    srcset
  } = props;

  let imgTag = '';
  let srcsetData = '';

  FeaturedImage.propTypes = {
    image: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    srcset: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    imageSize: PropTypes.string
  }

  if (srcset && srcset[imageSize] && srcset[imageSize].srcset) {
    srcsetData = srcset[imageSize].srcset;
  }

  if (image && image[imageSize]) {
    imgTag = <img src={image[imageSize].src} srcSet={srcsetData} alt={image[imageSize].alt}></img>;
  }

  return imgTag;
}

export default FeaturedImage;