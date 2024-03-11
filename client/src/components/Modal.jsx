import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Modal = ({ mode, setShowModal, fetchData, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const serverURL = import.meta.env.VITE_SERVERURL;
  const editMode = mode === 'edit' ? true : false;
  const [data, setdata] = useState({
    user_email: editMode ? task.user_email : cookies.email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverURL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        console.log('data posted successfully');
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverURL}/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log('data edited successfully');
        setShowModal(false);
        fetchData();
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
      <div className='modal'>
        <div className='form-title-container'>
          {' '}
          <h3>Let's {mode} your task!</h3>
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
        <form action=''>
          <input
            required
            maxLength={30}
            placeholder='your task goes here'
            name='title'
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor='range'> Drag to select your current progress!</label>
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
            className={mode}
            type='submit'
            value='Submit'
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
