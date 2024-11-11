import { MouseEventHandler, PropsWithChildren } from 'react';

interface ModalProps {
  title: string;
  onClose: MouseEventHandler;
}

const Modal = ({ title, children, onClose }: PropsWithChildren<ModalProps>) => {
  return (
    <>
      <div className='modal-backdrop show'></div>
      <div className='modal d-block' tabIndex={-1}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{title}</h5>
              <button
                type='button'
                className='btn-close'
                aria-label='Close'
                onClick={onClose}
              ></button>
            </div>
            <div className='modal-body'>{children}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
