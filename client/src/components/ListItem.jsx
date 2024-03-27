import { useState } from 'react';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
import { TASKS } from '../constants';

const ListItem = ({ fetchData, task }) => {
  const [showModal, setShowModal] = useState(false);
  const authToken = localStorage.getItem('authToken');

  const serverURL = import.meta.env.VITE_SERVERURL;

  //delete task from the database
  const deleteItem = async () => {
    try {
      const response = await fetch(`${serverURL}/${TASKS}/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li className='flex flex-row max-md:flex-col gap-6 font-caladea justify-between max-md:justify-center items-center my-6 leading-10 border-solid border-2 rounded-lg shadow-md bg-[#F7EEDD]'>
      <p className='lg:ml-6 md:w-64 text-2xl font-bold text-[#008DDA]'>
        {task.title}
      </p>
      <div className=''>
        <ProgressBar progress={task.progress} />
      </div>
      <div className='lg:mr-6 flex flex-row gap-4'>
        <button
          className='text-bold  bg-[#41C9E2] rounded-lg text-[#F7EEDD] px-4 py-2 leading-6 font-semibold hover:bg-green-800'
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        <button
          className='text-bold bg-[#008DDA] rounded-lg text-[#F7EEDD] px-4 py-2 leading-6 font-semibold hover:bg-orange-800'
          onClick={deleteItem}
        >
          Delete
        </button>
      </div>
      {showModal && (
        <Modal
          mode='edit'
          setShowModal={setShowModal}
          fetchData={fetchData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
