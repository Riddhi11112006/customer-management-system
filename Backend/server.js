const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csc'
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

        return res.json(data);

    });

});



// ADD USER
app.post('/add_user', (req, res) => {

    const sql = `
        INSERT INTO users
        (name, mobile, work, Application_No, Document_No, date, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
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

    db.query(sql, values, (err, result) => {

        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json("User Added Successfully");

    });

});



// DELETE USER
app.delete('/delete_user/:id', (req, res) => {

    const sql = "DELETE FROM users WHERE id = ?";

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
        SET name=?, mobile=?, work=?, Application_No=?, Document_No=?, date=?, Status=?
        WHERE id=?
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

        return res.json(data);

    });

});



// ADD USER
app.post('/add_lottery', (req, res) => {

    const sql = `
        INSERT INTO lottery
        (name, mobile,date, budget)
        VALUES (?, ?, ?, ?)
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
        SET name=?, mobile=?, date=?, budget=?
        WHERE id=?
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

app.listen(8081, () => {
    console.log("Listening on port 8081");
});