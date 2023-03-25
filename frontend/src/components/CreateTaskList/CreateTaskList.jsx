import React, { useEffect, useState } from 'react'
import "./CreateTaskList.css"
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';

let mailid = [];

const CreateTaskList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetList()
  }, []);


  function GetList() {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/tasklist`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error))
  }

  const PostData = async (e, itemId) => {
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_API_URL}/delete/${itemId}`;
    await fetch(apiUrl, {
      method: "DELETE"
    }).then(() => {
      GetList();
    }).catch((error) => {
      console.error(error);
    })
  }



  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (itemId, name, email) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));

    if (!checkedItems[itemId]) {
      mailid.push(email);
    } else {
      mailid = mailid.filter((mail) => mail !== email);
    }
  };



  // let listId = 1;

  const sendMail = () => {
    const emailList = mailid.join(", "); // Join all selected email IDs into a single string separated by commas
    const subject = "Selected Names"; // Subject of the email
    const body = `The following names have been selected: ${emailList}`; // Body of the email
    const mailtoLink = `mailto:info@redpositive.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; // Open the default email client with the email parameters

    window.open(mailtoLink);
  }


  return (
    <>
      <div className='main'>
        <div className='Heading'><div>Task List</div>
          <div className='Link'>
            <Link className='Links' to="/">Home</Link>
            <Link className='Links' to="/List">Task List</Link>
          </div>
        </div>
        <table className='list-table'>
          <tr className='table-head'>
            <th className='table-row'>Select</th>
            <th className='table-row'>ID</th>
            <th className='table-row'>Name</th>
            <th className='table-row'>Phone</th>
            <th className='table-row'>Email</th>
            <th className='table-row'>Hobbies</th>
            <th className='table-row'>Update/Delete</th>
          </tr>
          {
            data.map((item, id) => {
              const { _id, name, phone, email, hobbies } = item;
              const isChecked = checkedItems[_id];
              return (
                <tr className={!isChecked ? 'table-row' : 'table-row checked'}>
                  <td>
                    <form className='form--List' method='POST'>
                      <div>
                        <input type="checkbox" onChange={() => handleCheckboxChange(_id, name, email)} />
                      </div>
                    </form>
                  </td>
                  <td>{id + 1}</td>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>{email}</td>
                  <td>{hobbies}</td>
                  <td>
                    <Link to={`/List/${item._id}`}> <button className='button--List'><EditIcon /></button></Link>
                    <button className='button--List' type='submit' onClick={(e) => { PostData(e, _id) }} name='submit' value={_id}><DeleteForeverIcon /></button>
                  </td>
                </tr>
              )
            })
          }
        </table>

        {
          mailid.length > 0 ? (
            <div className='send-main-btn'>
              <button className='send-mail' onClick={sendMail}>Send Mail</button>
            </div>
          ) : (<div className='send-main-btn-div'>Select row/rows to Send Mail</div>)
        }
        <div className='add-data--btn--div'>
          <Link to={'/'}><button className='add--data'><AddBoxIcon /></button> </Link>
        </div>
      </div>
    </>
  )
}

export default CreateTaskList;
