export const ImageGalleryItem = ({ image }) => {
  const { webformatURL, tags } = image;
  console.log(image);
  return (
    <li>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};
