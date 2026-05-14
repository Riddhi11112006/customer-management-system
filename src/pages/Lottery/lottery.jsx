import React,{useEffect,useState} from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/searchbar';
import Winner from'../../components/Winner/winner';

function Lottery() {
  const [data, setData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetch('https://customer-management-system-vvsh.onrender.com/lottery')
      .then(res => res.json())
      .then(data => {setData(data);setFilteredData(data);})
      .catch(err => console.log(err));
  }, [])
const handleEdit = (id) => {
  console.log("Edit user:", id);
};

  return (
    
    <div style={{ padding: '20px' }}>
        <h1>Lottery Users</h1>
        <SearchBar data={data} setFilteredData={setFilteredData} />
        
<Winner data={data} />

      <table
        border="1"
        cellPadding="10"
        style={{
          margin: '20px',
          borderCollapse: 'collapse',
          width: '100%',
          background: 'white',
          textAlign: 'center',
          
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Date</th>
            <th>Budget</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.mobile}</td>
              <td>
                {new Date(d.date).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </td>
              <td>{d.budget}</td>
              <td>
                <button onClick={() => handleEdit(d.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Lottery;