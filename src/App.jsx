import React,{useEffect,useState} from 'react'
import './App.css';
import PersistentDrawerLeft from './components/Drawer/drawer';
import AddUser from './pages/AddUser/addUser';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <PersistentDrawerLeft />
      
    </div>
  )
}

export default App;
