import React, { useState } from "react";
import './addUser.css';
import axios from "axios";

const initialForm = {
  name: '',
  mobile: '',
  work: '',
  Application_No: '',
  Document_No: '',
  date: '',
  Status: 'Pending'
};

const AddUser = ({ onSubmit, onClose }) => {

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await axios.post(
      'https://customer-management-system-vvsh.onrender.com/add_user',
      {
        name: form.name,
        mobile: form.mobile,
        work: form.work,
        Application_No: form.Application_No,
        Document_No: form.Document_No,
        date: form.date,
        Status: form.Status
      }
    );

    console.log(res.data);

    alert("User Added Successfully");

    setForm(initialForm);

    if(onClose){
      onClose();
    }

  } catch(err) {

    console.log(err);

  }
};

  return (
    <div className="rentout-modal-bg">

      <div className="rentout-modal">

        <h2>Add User</h2>

        <form className="rentout-form" onSubmit={handleSubmit}>

          <label>
            Name:
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
<br />
          <label>
            Mobile No:
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </label>
<br />
          <label>
            Work:
            <select
  name="work"
  value={form.work}
  onChange={handleChange}
>
  <option class="option" value="aadhar card">Aadhar Card</option>
  <option class="option" value="pan card">PAN Card</option>
  <option class="option" value="E-district">E-district</option>
  <option class="option" value="mcd">MCD</option>
  <option class="option" value="Education">Education</option>
  <option class="option" value="Shop work">Shop Work</option>
</select>
          </label>
<br />
<label>
            Application No.:
            <input
              name="Application_No"
              value={form.Application_No}
              onChange={handleChange}
              required
            />
          </label>
<br />
<label>
            Document No.:
            <input
              name="Document_No"
              value={form.Document_No}
              onChange={handleChange}
              required
            />
          </label>
<br />
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
<br />
          <label>
            Status:
            <select
  name="Status"
  value={form.Status}
  onChange={handleChange}
>
  <option value="Pending">Pending</option>
<option value="Completed">Completed</option>
<option value="UnderProcess">Under Process</option> 
</select>
          </label>
<br />
          <button
            type="submit"
            className="rentout-submit"
          >
            Add User
          </button>
      
          <button
            type="button"
            className="rentout-submit"
            onClick={onClose}
          >
            Cancel
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddUser;