import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import css from './ImageGallery.module.css'


const ImageGallery = ({ images, onSelectImg }) =>
  <ul className={css.imageGallery}>
        {images.map(image => {
            return (
              <ImageGalleryItem key={image.id} image={image} onClick={()=> onSelectImg(image.largeImageURL, image.tags)}/>)}
        )}
  </ul>

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onSelectImg: PropTypes.func.isRequired
};

export default ImageGallery;