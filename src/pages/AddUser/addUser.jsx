import React, { useEffect, useState } from "react";
import './addUser.css';
import axios from "axios";

const API_BASE_URL = 'https://customer-management-system-vvsh.onrender.com';

const initialForm = {
  name: '',
  mobile: '',
  work: '',
  Application_No: '',
  Document_No: '',
  date: '',
  Status: 'Choose'
};

const formatDateForInput = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split("T")[0];
};

const valueOrNA = (value) => {
  const trimmed = String(value || '').trim();
  return trimmed || 'N/A';
};

const AddUser = ({ initialData, onSubmit, onClose }) => {

  const [form, setForm] = useState(initialForm);
  const isEditing = Boolean(initialData?.id);

  useEffect(() => {
    if (!initialData) {
      setForm(initialForm);
      return;
    }

    setForm({
      name: initialData.name || '',
      mobile: initialData.mobile || '',
      work: initialData.work || '',
      Application_No: initialData.Application_No || '',
      Document_No: initialData.Document_No || '',
      date: formatDateForInput(initialData.date),
      Status: initialData.Status || 'Choose'
    });
  }, [initialData]);

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

    const payload = {
      name: form.name,
      mobile: form.mobile,
      work: form.work,
      Application_No: valueOrNA(form.Application_No),
      Document_No: valueOrNA(form.Document_No),
      date: form.date,
      Status: form.Status
    };

    const res = isEditing
      ? await axios.put(`${API_BASE_URL}/update_user/${initialData.id}`, payload)
      : await axios.post(`${API_BASE_URL}/add_user`, payload);

    if (res.data?.error) {
      throw new Error(res.data.error);
    }

    console.log(res.data);

    alert(isEditing ? "User Updated Successfully" : "User Added Successfully");

    setForm(initialForm);

    if(onSubmit){
      await onSubmit(res.data);
    }

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

        <h2>{isEditing ? "Edit User" : "Add User"}</h2>

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
  <option className="option" value="aadhar card">Aadhar Card</option>
  <option className="option" value="pan card">PAN Card</option>
  <option className="option" value="E-district">E-district</option>
  <option className="option" value="mcd">MCD</option>
  <option className="option" value="Education">Education</option>
  <option className="option" value="Shop work">Shop Work</option>
</select>
          </label>
<br />
<label>
            Application No.:
            <input
              name="Application_No"
              value={form.Application_No}
              onChange={handleChange}
              
            />
          </label>
<br />
<label>
            Document No.:
            <input
              name="Document_No"
              
              value={form.Document_No}
              onChange={handleChange}
              
            />
          </label>
<br />
          <label>
            Date:
            <input
  type="date"
  name="date"
  value={form.date || new Date().toISOString().split("T")[0]}
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
  <option value="Choose">Choose</option>
  <option value="Rejected">Rejected</option>
<option value="Completed">Completed</option>
<option value="UnderProcess">Under Process</option> 
</select>
          </label>
<br />
          <button
            type="submit"
            className="rentout-submit"
          >
            {isEditing ? "Update User" : "Add User"}
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
