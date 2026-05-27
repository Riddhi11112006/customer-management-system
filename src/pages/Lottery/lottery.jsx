import React,{useEffect,useState} from 'react';
import SearchBar from '../../components/SearchBar/searchbar';
import Winner from'../../components/Winner/winner';
import AddLottery from '../AddLottery/addLottery';

const API_BASE_URL = 'https://customer-management-system-vvsh.onrender.com';

function Lottery() {
  const [data, setData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [editingLotteryUser, setEditingLotteryUser] = useState(null);

const loadLottery = () => {
  fetch(`${API_BASE_URL}/lottery`)
    .then(res => res.json())
    .then(data => {setData(data);setFilteredData(data);})
    .catch(err => console.log(err));
};

  useEffect(() => {
    loadLottery();
  }, [])

const handleEdit = (lotteryUser) => {
  setEditingLotteryUser(lotteryUser);
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
                <button onClick={() => handleEdit(d)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingLotteryUser && (
        <AddLottery
          initialData={editingLotteryUser}
          onSubmit={loadLottery}
          onClose={() => setEditingLotteryUser(null)}
        />
      )}
    </div>
  )
}

export default Lottery;
