import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

type MyModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const MyModal = ({ children, isOpen, onClose }: MyModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        className="absolute top-2/4 left-2/4 p-4 m-2 bg-white rounded-lg"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex justify-end">
          <button onClick={() => onClose()} className="mb-2">
            <CloseIcon fontSize="small" />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default MyModal;
