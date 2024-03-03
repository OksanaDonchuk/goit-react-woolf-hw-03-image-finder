import css from './Button.module.css';

const Button = ({ loadClick }) => (
  <button type="button" onClick={loadClick} className={css.btn_more}>
    Load more...
  </button>
);

export default Button;
