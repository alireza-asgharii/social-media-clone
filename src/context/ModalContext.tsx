import React, { createContext, useContext, useState } from "react";

type ContextType = {
  title: string;
  desc: string;
  buttonName?: string;
  confirmAction: () => void;
  openModal: (
    modalTitle: string,
    modalDesc: string,
    confirmAction: any,
    buttonName?: string,
  ) => void;
};

const initial: ContextType = {
  title: "",
  desc: "",
  confirmAction: () => {},
  openModal: () => {},
};

const ModalContext = createContext<ContextType>(initial);

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [buttonName, setButtonName] = useState<string | undefined>();
  const [action, setAction] = useState<() => void>(() => {});

  const openModalHandler = (
    modalTitle: string,
    modalDesc: string,
    confirmAction: any,
    buttonName?: string,
  ) => {
    document.getElementById("modal")?.click();
    setTitle(modalTitle);
    setDesc(modalDesc);
    setButtonName(buttonName);
    setAction(() => confirmAction);
  };

  return (
    <ModalContext.Provider
      value={{
        title,
        desc,
        buttonName,
        confirmAction: action,
        openModal: openModalHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => {
  return useContext(ModalContext);
};
