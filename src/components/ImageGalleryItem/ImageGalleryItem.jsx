import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClickImage,
}) => (
  <li className={css.gallery_item} onClick={() => onClickImage(largeImageURL)}>
    <img src={webformatURL} alt={tags} className={css.gallery_image} />
  </li>
);

export default ImageGalleryItem;
