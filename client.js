var monthlyCost = 0;

$(document).ready(readyNow);

function readyNow() {
  //Event Listeners
  $('.monthlyCostDiv').children('h3').text('$' + monthlyCost);
  $('#submitButton').on('click', collectEmployeeInfo);
  $('.container').on('click', '.delete', removeEmployee);
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
  $row.append('<td class="tdSalary">' + newEmployee.annualSalary + '</td>');
  $row.append('<td><button class="delete">Delete Employee</button</td>');
  $('#employeeInfoTable').append($row);
  $('input').val('');
  calculateMonthlyCosts(newEmployee);
} //end collectEmployeeInfo

function calculateMonthlyCosts(employeeToAdd) {
  monthlyCost = Math.round(monthlyCost + (employeeToAdd.annualSalary / 12));
  $('.monthlyCostDiv').children('h3').text('$' + monthlyCost);
  checkRedAlert();
} //end employeeToAdd

function removeEmployee() {
  var empSalary = $(this).closest('tr').find('.tdSalary').text();
  monthlyCost -= Math.round(empSalary / 12);
  $('.monthlyCostDiv').children('h3').text('$' + monthlyCost);
  $(this).closest('tr').remove();
  checkRedAlert();
} //end removeEmployee

function checkRedAlert () {
  if(monthlyCost > 8000) {
    $('.monthlyCostDiv').children('h3').toggleClass('redAlert', true);
  } else {
    $('.monthlyCostDiv').children('h3').toggleClass('redAlert', false);
  } // end if else
} //end checkRedAlert
