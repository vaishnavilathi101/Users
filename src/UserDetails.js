import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

function UserDetails(props) {
  const navigate = useNavigate()
  let { user_id } = useParams()
  const [data, setData] = useState({})
  useEffect(() => {
    const data = props.users.find(item => item.id == user_id)
    setData(data)
  }, [user_id])
  return (
    <div class="container">
      <button onClick={() => navigate('/')} className="style-button style-cursor"><i class="fa fa-arrow-left" aria-hidden="true"></i><span className="style-span">Details: {data.first_name}</span>
      </button>

      <p>First Name: <span className="style-font">{data.first_name}</span></p>
      <p>Last Name: <span className="style-font">{data.last_name}</span></p>
      <p>Company Name: <span className="style-font">{data.company_name}</span></p>
      <p>City: <span className="style-font">{data.city}</span></p>
      <p>State: <span className="style-font">{data.state}</span></p>
      <p>Zip: <span className="style-font">{data.zip}</span></p>
      <p>Email: <span className="style-font">{data.email}</span></p>
      <p>Web: <span className="style-font">{data.web}</span></p>
      <p>Age: <span className="style-font">{data.age}</span></p>
    </div>
  );
}

export default UserDetails;
