import toast from "react-hot-toast";
const ToastConfirm = (text1, text2, text3 = "", onNo, onYes) => {
  return (t) => (
    <div>
      <div>
        {text1} <b>{text2}</b> {text3}?
      </div>
      <div className="alert">
        <button
          className="btn-primary"
          onClick={() => {
            toast.dismiss(t.id);
            onNo();
          }}
        >
          No
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            toast.dismiss(t.id);
            onYes();
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ToastConfirm;
