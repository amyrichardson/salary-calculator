var monthlyCost = 0;

$(document).ready(readyNow);

function readyNow() {
  //Event Listeners
  $('.monthlyCostDiv').children('h3').text('$' + monthlyCost);
  $('#submitButton').on('click', collectEmployeeInfo);
  $('#employeeInfoTable').on('click', '#delete', removeEmployee);
  $('input').keypress(function(e) {
    if (e.which == 13) {
      collectEmployeeInfo();
    } //end if 13
  }); //end keypress
} //end readyNow

function collectEmployeeInfo() {
  var newEmployee = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    employeeID: $('#employeeID').val(),
    jobTitle: $('#jobTitle').val(),
    annualSalary: $('#annualSalary').val()
  }; //end newEmployee
  var $row = $('<tr>');
  $row.append('<td>' + newEmployee.firstName + ' ' + newEmployee.lastName + '</td>');
  $row.append('<td>' + newEmployee.employeeID + '</td>');
  $row.append('<td>' + newEmployee.jobTitle + '</td>');
  $row.append('<td>$' + newEmployee.annualSalary + '</td>');
  $row.append('<td><button id="delete">Delete Employee</button</td>');
  $('#employeeInfoTable').append($row);
  $('input').val('');
  calculateMonthlyCosts(newEmployee);
} //end collectEmployeeInfo

function calculateMonthlyCosts(employeeToAdd) {
  monthlyCost = Math.round(monthlyCost + (employeeToAdd.annualSalary / 12));
  $('.monthlyCostDiv').children('h3').text('$' + monthlyCost);
} //end employeeToAdd

function removeEmployee() {
  $(this).closest('tr').remove();
} //end removeEmployee
