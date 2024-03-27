import { useState } from 'react';
import { TASKS } from '../constants';

const Modal = ({ mode, setShowModal, fetchData, task }) => {
  const serverURL = import.meta.env.VITE_SERVERURL;
  const editMode = mode === 'edit' ? true : false;
  const [data, setdata] = useState({
    user_email: editMode ? task.user_email : localStorage.getItem('email'),
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const authToken = localStorage.getItem('authToken');
  //add task to the database
  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverURL}/${TASKS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        console.log('data posted successfully');
        setShowModal(false);
        fetchData();
      } else {
        setShowModal(false);
        localStorage.removeItem('email');
        localStorage.removeItem('authToken');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //edit task in the database
  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverURL}/${TASKS}/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log('data edited successfully');
        setShowModal(false);
        fetchData();
      } else {
        setShowModal(false);
        localStorage.removeItem('email');
        localStorage.removeItem('authToken');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  return (
    <div className='overlay'>
      <div className='p-8 bg-[#F7EEDD] font-caladea h-96'>
        <div className='md:w-[600px] flex flex-row justify-between items-center opacity-100'>
          {' '}
          <h3 className='font-bold'>Let&apos;s {mode} your task!</h3>
          <button
            className='text-bold bg-red-500 rounded-lg text-white px-4 py-2 leading-6 font-semibold hover:bg-red-800'
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
        <form
          className='flex flex-col justify-center'
          onSubmit={editMode ? editData : postData}
        >
          <input
            required
            maxLength={30}
            placeholder='your task goes here'
            name='title'
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label className='text-lg font-bold' htmlFor='range'>
            {' '}
            Drag to select your current progress!
          </label>
          <input
            required
            type='range'
            id='range'
            min='0'
            max='100'
            name='progress'
            value={data.progress}
            onChange={handleChange}
          />

          <input
            className='bg-[#008DDA] rounded-lg text-white px-4 py-2 leading-6 font-semibold hover:bg-blue-800'
            type='submit'
            value='Submit'
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
