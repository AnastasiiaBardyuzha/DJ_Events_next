import {
  useState,
  useEffect,
  FC,
  ReactNode,
  SyntheticEvent,
} from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from 'styles/Modal.module.css';

interface Props {
  show: boolean,
  onClose: () => void,
  title?: string,
  children: ReactNode
}

const Modal: FC<Props> = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true));

  const handleClose = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href='#' onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    const portalDiv = document.getElementById('modal-root');

    return portalDiv && ReactDOM.createPortal(
      modalContent,
      portalDiv,
    );
  } 
    return null;
};

export default Modal;
