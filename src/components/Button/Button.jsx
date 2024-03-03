import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.btn_more} onClick={onClick}>
      Load more...
    </button>
  );
};
export default Button;
