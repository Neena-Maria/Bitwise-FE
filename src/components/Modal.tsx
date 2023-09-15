import { ReactNode } from "react";
import { ReactComponent as Cross } from "../icons/cross.svg";

interface ModalProps {
  onCancel: () => void;
  isOpen: boolean;
  className?: string;
  children: ReactNode;
}
const Modal = ({
  onCancel,
  isOpen,
  className = "",
  children,
  ...props
}: ModalProps) => {
  const modalStyle = `fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center transition-opacity duration-300 ease-in-out ${
    isOpen ? "opacity-100" : "hidden opacity-0"
  }`;
  return (
    <div className={modalStyle} {...props}>
      <div className="absolute h-full w-full bg-black opacity-30" />
      <div
        className={`relative z-40 mx-auto rounded-lg bg-white shadow-lg ${className}`}
      >
        {children}
        <button onClick={onCancel} className="absolute right-2 top-2 mr-2 mt-2">
          <Cross />
        </button>
      </div>
    </div>
  );
};

export default Modal;
