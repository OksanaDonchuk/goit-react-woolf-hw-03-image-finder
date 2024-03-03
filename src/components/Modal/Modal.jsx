import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.documentElement.style.overflowY = 'hidden';
    window.addEventListener('keydown', this.handlePressKey);
  }
  componentWillUnmount() {
    document.documentElement.style.overflowY = '';
    window.removeEventListener('keydown', this.handlePressKey);
  }

  handleClickOverlay = evn => {
    if (evn.target !== evn.currentTarget) {
      return;
    }
    this.props.onClose();
  };

  handlePressKey = evn => {
    if (evn.key !== 'Escape') {
      return;
    }
    this.props.onClose();
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleClickOverlay}>
        <div className={css.modal}>
          <img width={700} height={500} src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
export default Modal;
