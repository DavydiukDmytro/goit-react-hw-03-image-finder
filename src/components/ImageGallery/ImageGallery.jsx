import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </Gallery>
  );
};
