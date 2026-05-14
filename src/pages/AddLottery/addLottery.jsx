import React, { useState } from "react";
import axios from "axios";

const initialForm = {
  name: '',
  mobile: '',
  date: '',
  budget: '100-500'
};

const AddLottery = ({ onSubmit, onClose }) => {

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
      'https://customer-management-system-vvsh.onrender.com/add_lottery',
      {
        name: form.name,
        mobile: form.mobile,
        date: form.date,
        budget: form.budget,
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

export default AddLottery;