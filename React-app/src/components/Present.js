import React, { useEffect, useState } from 'react';
import './Train.css';

const Present = () => {
  const [data, setData] = useState([]);
  
  const fetchdata = () => {
    fetch('http://localhost:5000/attendance/pres')
      .then(response => response.json())
      .then(dat => setData(dat))
      .catch(error => console.error('Error fetching train data:', error));
  };

  useEffect(() => {
    fetchdata();
  }, []);


  return (
    <div>
      
      <table>
        <thead>
          <tr>
            <th>Roll no</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(std => (
            <tr key={std._id}>
              <td>{std.roll_no}</td>
              <td>{std.date}</td>
              <td>{std.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Present;
