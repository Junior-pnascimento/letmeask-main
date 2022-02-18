import react from 'react';

import './style.css';

// type ModalType = {
//   setShowModal?: boolean;
// }
interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => isOpen ? (
  <div className={'modal'}>
    <div className={'modal-overlay'} />
    <div className={'modal-box'}>
      <div className={'modal-title'}>
        {title}
      </div>
      <div className={'modal-content'}>
        {children}
      </div>
    </div>
  </div>
) : null;