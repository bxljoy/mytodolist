import { useState } from "react";

import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

const ListItem = ({ fetchData, task }) => {
  const [showModal, setShowModal] = useState(false);

  const serverURL = import.meta.env.VITE_SERVERURL;
  const deleteItem = async () => {
    try {
      const response = await fetch(`${serverURL}/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button className="delete" onClick={deleteItem}>
          Delete
        </button>
      </div>
      {showModal && (
        <Modal
          mode="edit"
          setShowModal={setShowModal}
          fetchData={fetchData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
