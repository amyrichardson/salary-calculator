console.log('js sourced');
var monthlyCost = 0;

$(document).ready(readyNow);

function readyNow() {
  console.log('jq ready');
  //Event Listeners
  $('#submitButton').on('click', collectEmployeeInfo);
  $('input').keypress(function(e) {
    if (e.which == 13) {
      collectEmployeeInfo();
    }
  });
}

function collectEmployeeInfo () {
  var newEmployee = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    employeeID: $('#employeeID').val(),
    jobTitle: $('#jobTitle').val(),
    annualSalary: $('#annualSalary').val()
  };
  var $row = $('<tr>');
  $row.append('<td>' + newEmployee.firstName + ' ' + newEmployee.lastName + '</td>');
  $row.append('<td>' + newEmployee.employeeID + '</td>');
  $row.append('<td>' + newEmployee.jobTitle + '</td>');
  $row.append('<td>$' + newEmployee.annualSalary + '</td>');
  $('#employeeInfoTable').append($row);
  $('input').val('');
  calculateMonthlyCosts(newEmployee);
}

function calculateMonthlyCosts (employeeToAdd) {
  monthlyCost = Math.round(monthlyCost + (employeeToAdd.annualSalary/12));
  $('.monthlyCostDiv').children('h3').text('$' + monthlyCost);
}
