import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@/assets/closeIcon.svg';
import classes from './Modal.module.css';
import { ModalProps } from '@/types';

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <dialog ref={modalRef}>
      <span onClick={handleCloseModal} className={classes.close}>
        <img src={CloseIcon} alt={'close icon'} />
      </span>
      {children}
    </dialog>
  );
};

export default Modal;
