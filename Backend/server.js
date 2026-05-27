const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new Pool({
  connectionString: 'postgresql://postgres.kfpoadcfcwrdszfopizr:Abhijeet8806@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

// HOME ROUTE
app.get('/', (req, res) => {
    return res.json("Backend Running");
});



// GET USERS
app.get('/users', (req, res) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, data) => {

        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json(data.rows);

    });

});



// ADD USER
app.post('/add_user', (req, res) => {

    const sql = `
INSERT INTO users
(name, mobile, "work", "Application_No", "Document_No", date, "Status")
VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [
        req.body.name,
        req.body.mobile,
        req.body.work,
        req.body.Application_No,
        req.body.Document_No,
        req.body.date,
        req.body.Status
    ];

    db.query(sql, values,(err, result) => {

        if(err) {
            console.log(err.message);
            return res.json(err);
        }
        return res.json("User Added Successfully");

    });

});



// DELETE USER
app.delete('/delete_user/:id', (req, res) => {

    const sql = "DELETE FROM users WHERE id = $1";

    const id = req.params.id;

    db.query(sql, [id], (err, result) => {

        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json("User Deleted Successfully");

    });

});



// UPDATE USER
app.put('/update_user/:id', (req, res) => {

    const sql = `
        UPDATE users
        SET name=$1,
mobile=$2,
work=$3,
"Application_No"=$4,
"Document_No"=$5,
date=$6,
"Status"=$7
WHERE id=$8
    `;

    const values = [
        req.body.name,
        req.body.mobile,
        req.body.work,
        req.body.Application_No,
        req.body.Document_No,
        req.body.date,
        req.body.Status
    ];

    const id = req.params.id;

    db.query(sql, [...values, id], (err, result) => {

        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json("User Updated Successfully");

    });

});

// GET USERS
app.get('/lottery', (req, res) => {

    const sql = "SELECT * FROM lottery";

    db.query(sql, (err, data) => {

        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json(data.rows);

    });

});



// ADD USER
app.post('/add_lottery', (req, res) => {

    const sql = `
        INSERT INTO lottery
        (name, mobile,date, budget)
        VALUES ($1, $2, $3, $4)
    `;

    const values = [
        req.body.name,
        req.body.mobile,
        req.body.date,
        req.body.budget
    ];

    db.query(sql, values, (err, result) => {

        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json("User Added Successfully");

    });

});



// DELETE USER
app.delete('/clear_lottery', (req, res) => {

    const sql = "DELETE FROM lottery";

    db.query(sql, (err, result) => {

        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json("Lottery Cleared");

    });

});



// UPDATE USER
app.put('/update_lottery/:id', (req, res) => {

    const sql = `
        UPDATE lottery
        SET name=$1,
mobile=$2,
date=$3,
budget=$4
WHERE id=$5
    `;

    const values = [
        req.body.name,
        req.body.mobile,
        req.body.date,
        req.body.budget,
        
    ];

    const id = req.params.id;

    db.query(sql, [...values, id], (err, result) => {

        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json("User Updated Successfully");

    });

});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
