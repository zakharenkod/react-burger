import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay.tsx';

import styles from './modal.module.css';

type TModalProps = {
  children: ReactNode;
  title?: string;
  onClose?: () => void;
};

const modalRoot = document.getElementById('modal');

export const Modal = ({ title, children, onClose }: TModalProps): React.JSX.Element => {
  const handleEscButton = (event: KeyboardEvent): void => {
    if (onClose && event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscButton);

    return (): void => {
      document.removeEventListener('keydown', handleEscButton);
    };
  }, []);

  if (!modalRoot) return <></>;

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <dialog className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <button type="button" className={styles.button_close} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>

        <header className={`${styles.header} text text_type_main-large`}>
          {title && <div>{title}</div>}
        </header>
        <div className={styles.content}>{children}</div>
      </dialog>
    </>,
    modalRoot
  );
};
