const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

const employees = [];

router.get('/', function(req, res){
    console.log('get /employees hit!!');
    res.send(employees);
});

router.post('/', function(req, res){
    let newEmployee = req.body.newEmployee;
    employees.push(new Employee(newEmployee.firstName, newEmployee.lastName, newEmployee.employeeID, newEmployee.jobTitle, newEmployee.annualSalary));
    res.sendStatus(200);
});

module.exports = router;