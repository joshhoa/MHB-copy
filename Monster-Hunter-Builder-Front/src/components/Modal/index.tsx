/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint rule disabled because we have to be able to click on the div element here
import { CgCloseO } from 'react-icons/cg';

import './styles.scss';

interface ModalProps {
  children: React.ReactNode
  modalXl: boolean
  shown: boolean
  close: () => void
}

function Modal({
  children, modalXl, shown, close,
} : ModalProps) {
  return shown ? (
    <div className="modal-backdrop " onClick={close}>
      <div className={`modal ${modalXl ? 'modal-xl' : ''}`} onClick={(event : React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}>
        <button className="modal__button-close" type="button" aria-label="close" onClick={close}><CgCloseO className="modal__button-close__icon" /></button>
        {/* children : all the nested elements */}
        {children}
      </div>
    </div>
  ) : null;
}

export default Modal;
