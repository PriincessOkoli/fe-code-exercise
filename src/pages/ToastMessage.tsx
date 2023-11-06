import { useState, useEffect } from "react";

function ToastMessage(props: {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}) {
  const { message, isVisible, onClose } = props;
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  const closeNotification = () => {
    setShow(false);
    onClose();
  };

  return show ? (
    <div className="notification">
      <div className="notification-content">
        <p>{message}</p>
        <button onClick={closeNotification}>X</button>
      </div>
    </div>
  ) : null;
}

export default ToastMessage;
