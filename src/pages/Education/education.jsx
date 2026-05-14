import React,{useEffect,useState} from 'react'
import SearchBar from '../../components/SearchBar/searchbar';

function Education () {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then(res => res.json())
      .then(data => {setData(data);setFilteredData(data);})
      .catch(err => console.log(err));
  }, [])

  return (
    
    <div style={{ padding: '20px' }}>
        <h1>Education</h1>
        <SearchBar data={data} setFilteredData={setFilteredData} />
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
            <th>Service</th>
            <th>Application_No</th>
            <th>Document_No</th>
            <th>Date</th>
            <th>Status</th>
       
          </tr>
        </thead>
        <tbody>
          {filteredData
  .filter((d) => d.work === "education")
  .map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.mobile}</td>
              <td>{d.work}</td>
              <td>{d.Application_No}</td>
              <td>{d.Document_No}</td>
              <td>{new Date(d.date).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </td>
              <td>{d.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Education;     