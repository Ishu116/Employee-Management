import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Edit = () => {

  const navigate = useNavigate();

  const { id} = useParams();

  const [userData, setUserData] = useState({
    name: "", phone: "", email: "", hobbies: ""
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }

  useEffect(()=>{
    const Getuser = async ()=>{
      const apiUrl = `http://localhost:5000/edit/${ id}`;
      await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json"
        }
      }).then((res)=>res.json())
      .then((data)=>{setUserData(data)})
      .catch((err)=>{console.log(err);})
    }
    Getuser();
  }, [id]);

  const UpdateData = async (e) => {
    e.preventDefault();
    const apiUrl = `http://localhost:5000/update/${id}`;
    const {name, phone, email, hobbies} = userData;
    
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, phone, email, hobbies
        })
      });
      
      if (response.ok) {
        // Show a success message or notification to the user
        console.log("Task updated successfully");
        
        // Redirect to task list page
        navigate('/List');
      } else {
        // Show an error message or notification to the user
        console.log("There was an error updating the task");
      }
    } catch (error) {
      // Show an error message or notification to the user
      console.error(error);
      console.log("There was an error updating the task", error);
    }
  }
  

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
            <input className='field' value={userData.name} type='text' name='name' placeholder='Task Name' onChange={handleInputs} required />
          </div>
          <label htmlFor='phone'>
            Phone :
            <input type='text' value={userData.phone} name='phone' onChange={handleInputs} required />
          </label>
          <label htmlFor='email'>
            Email :
            <input type='text' value={userData.email} name='email' onChange={handleInputs} required />
          </label>

          <label htmlFor='hobbies'>Hobbies : </label>
          <textarea className='field' value={userData.hobbies} name='hobbies' id='text' cols='40' rows='5' onChange={handleInputs} required></textarea>
          <button type='submit' onClick={UpdateData}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Edit