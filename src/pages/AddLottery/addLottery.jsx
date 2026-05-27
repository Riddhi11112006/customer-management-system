import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = 'https://customer-management-system-vvsh.onrender.com';

const initialForm = {
  name: '',
  mobile: '',
  date: '',
  budget: '100-500'
};

const formatDateForInput = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split("T")[0];
};

const AddLottery = ({ initialData, onSubmit, onClose }) => {

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
      date: formatDateForInput(initialData.date),
      budget: initialData.budget || '100-500'
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
      date: form.date,
      budget: form.budget,
    };

    const res = isEditing
      ? await axios.put(`${API_BASE_URL}/update_lottery/${initialData.id}`, payload)
      : await axios.post(`${API_BASE_URL}/add_lottery`, payload);

    console.log(res.data);

    alert(isEditing ? "User Updated Successfully" : "User Added Successfully");

    setForm(initialForm);

    if(onSubmit){
      onSubmit(res.data);
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

        <h2>{isEditing ? "Edit Lottery User" : "Add User"}</h2>

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
            Budget:
            <select
  name="budget"
  value={form.budget}
  onChange={handleChange}
>
  <option value="100-500">100-500</option>
<option value="500-1000">500-1000</option>
<option value="1000+">1000+</option> 
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

export default AddLottery;
