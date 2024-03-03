import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  handelImageClick,
}) => {
  return (
    <li className={css.gallery_item}>
      <img
        onClick={() => {
          handelImageClick(largeImageURL);
        }}
        className={css.galleryItem_image}
        src={webformatURL}
        alt=""
      />
    </li>
  );
};
export default ImageGalleryItem;
