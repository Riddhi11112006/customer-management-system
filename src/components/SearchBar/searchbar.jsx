import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ data, setFilteredData }) {

  const [search, setSearch] = useState('');

  const handleSearch = (value) => {

    setSearch(value);

    const lower = value.toLowerCase();

    const filtered = data.filter((d) => {

      return (
  String(d.name).toLowerCase().includes(lower) ||

  String(d.mobile).toLowerCase().includes(lower) ||

  String(d.work).toLowerCase().includes(lower) ||

  String(d.Application_No).toLowerCase().includes(lower) ||

  String(d.Document_No).toLowerCase().includes(lower) ||

  String(d.Status).toLowerCase().includes(lower)
);

    });

    setFilteredData(filtered);
  };

  return (

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}
    >

      <input
        type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          padding: '10px',
          width: '300px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      />

      <button
        style={{
          marginLeft: '10px',
          padding: '10px'
        }}
      >
        <SearchIcon />
      </button>

    </div>
  );
}

export default SearchBar;