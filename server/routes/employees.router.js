const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

const employees = [];

router.get('/', function(req, res){
    console.log('get /employees hit!!');
    res.send(employees);
});

router.post('/', function(req, res){
    employees.push(new Employee(req.body.firstName, req.body.lastName, req.body.employeeID, req.body.jobTitle, req.body.annualSalary));
    res.sendStatus(200);
});

module.exports = router;