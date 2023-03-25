import React, { useState } from 'react';
import './CreateTask.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CreateTask = () => {

  const { id } = useParams("");

  console.log(id);
  const history = useNavigate();
  const [backend, setBackend] = useState({
    name: "", phone: " ", email: " ", hobbies: " "
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBackend({ ...backend, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, phone, email, hobbies } = backend;
    const apiUrl = "http://localhost:5000/api/createtask";
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        hobbies,
      }),
    });

    await res.json();
    history('/List');
  };


  return (
    <div className='main'>
      <div className='Heading'>
        <div>Create Task</div>
        <div className='Link'>
          <Link className='Links' to='/'>
            Home
          </Link>
          <Link className='Links' to='/List'>
            Task List
          </Link>
        </div>
      </div>
      <div className='Form'>
        <form className='form' method='POST'>
          <div>
            <label htmlFor='name'>Name : </label>
            <input className='field' value={backend.name} type='text' name='name' placeholder='Name' onChange={handleInputs} required />
          </div>
          <label htmlFor='phone'>
            Phone :
            <input type='text' placeholder='Phone' name='phone' onChange={handleInputs} required />
          </label>
          <label htmlFor='email'>
            Email :
            <input type='text' name='email' placeholder='Email' onChange={handleInputs} required />
          </label>
          <label htmlFor='hobbies'>Hobbies : </label>
          <textarea className='field' value={backend.hobbies} name='hobbies' id='text' cols='40' rows='5' onChange={handleInputs} required></textarea>
          <button type='submit' onClick={PostData}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;