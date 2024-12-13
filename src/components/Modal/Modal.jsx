import { ReactComponent as IconClose } from '../../assets/images/icon_close.svg';
import './Modal.scss';

function Modal({ data, onClose }) {
  return (
    <section className="modal-popup">
      <div className="backdrop" onClick={onClose} />
      <div className="modal-content">
        <button type="button" className="btn-popup-close" onClick={onClose}>
          <IconClose />
        </button>
        {data}
      </div>
    </section>
  );
}

export default Modal;
