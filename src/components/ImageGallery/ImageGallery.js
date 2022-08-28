import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ items, onClick }) => {
  return (
    <Gallery>
      {items.map(item => {
        return <ImageGalleryItem key={item.id} item={item} onClick={onClick} />;
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
