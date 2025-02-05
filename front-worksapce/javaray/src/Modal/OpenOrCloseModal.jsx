import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    setIsModal(isModal);
  }, [isModal]);
  const openModal = (boolean) => {
    setIsModal(boolean);
  };
  return (
    <ModalContext.Provider value={{ openModal, isModal, setIsModal }}>
      {children}
    </ModalContext.Provider>
  );
};
