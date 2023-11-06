function DeleteModal(props: {
  isVisible: boolean;
  close: () => void;
  name: string;
  id: string;
  next: () => void;
}) {
  const { isVisible, close, name, id, next } = props;
  if (!isVisible) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={close}>
          X
        </button>
        <div className="modal-div">
          <h2>Delete {name}?</h2>
          <p>Are you sure you want to delete {name}? It’s not reversible.</p>
          <div className="modal-buttons">
            <button
              className="delete"
              onClick={() => {
                next();
                close();
              }}
            >
              Delete
            </button>
            <button className="cancel" onClick={close}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
