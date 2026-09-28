import { useCallback, useState } from 'react';

type ModalResult = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (): ModalResult => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return { isModalOpen, openModal, closeModal };
};
