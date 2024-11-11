const Loader = () => {
  return (
    <>
      <div className='modal-backdrop show'></div>
      <div
        className='modal d-flex justify-content-center align-items-center'
        tabIndex={-1}
      >
        <div className='spinner-grow d-flex' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
