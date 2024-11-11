import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from './modalSlice';

const Modal = () => {
  const title = useSelector((state: RootState) => state.modal.title);
  const body = useSelector((state: RootState) => state.modal.body);
  const onConfirm = useSelector((state: RootState) => state.modal.onConfirm);

  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      void (await onConfirm());
      dispatch(closeModal());
    }
  };

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
                onClick={handleClose}
              ></button>
            </div>
            <div className='modal-body'>{body}</div>
            <div className='modal-footer'>
              {!onConfirm ? null : (
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              )}
              <button
                type='button'
                className='btn btn-danger'
                onClick={handleClose}
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
