import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ item, onClick }) => {
  const { webformatURL, tag, largeImageURL } = item;
  return (
    <Item>
      <Image
        src={webformatURL}
        alt={tag}
        onClick={() => onClick(largeImageURL)}
        loading="lazy"
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  items: PropTypes.exact({
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    tag: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
