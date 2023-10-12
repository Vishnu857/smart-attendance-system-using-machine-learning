import React, { useEffect, useState } from 'react';
import './Train.css';

const Absent = () => {
  const [data, setData] = useState([]);

  const fetchdata = () => {
    fetch('http://localhost:5000/abs')
      .then(response => response.json())
      .then(dat => setData(dat))
      .catch(error => console.error('Error fetching train data:', error));
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const handle=()=>{
    fetch("http://localhost:5000/sendsms")
  }

  return (
    <div className='abs'>
      <table>
        <thead>
          <tr>
            <th>Roll no</th>
            <th>Name</th>
            <th>Year</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map(student => (
            <tr key={student._id}>
              <td>{student.roll_no}</td>
              <td>{student.Name}</td>
              <td>{student.year}</td>
              <td>{student.phno}</td>
            </tr>
          ))}

        </tbody>
      </table>
      <button onClick={handle}>send message</button>
    </div>
  );
};

export default Absent;
