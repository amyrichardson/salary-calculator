let monthlyCost = 0;

$(document).ready(readyNow);

function readyNow() {
  //Event Listeners
  $('.inputForm').hide();
  $('.monthlyCostDiv').children('h3').text('$' + monthlyCost);
  $('.newEmployee').on('click', showInputForm);
  $('#submitButton').on('click', collectEmployeeInfo);
  $('#exitForm').on('click', exitForm);
  $('.container').on('click', '.delete', removeEmployee);
  $('input').keypress(function(e) {
    if (e.which == 13) {
      collectEmployeeInfo();
    } //end if 13
  }); //end keypress
} //end readyNow

function collectEmployeeInfo() {  
  $('.inputForm').hide();
  
  let newEmployee = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    employeeID: $('#employeeID').val(),
    jobTitle: $('#jobTitle').val(),
    annualSalary: $('#annualSalary').val()
  }; //end newEmployee

  $.ajax({
    method: 'POST',
    url: '/employees',
    data: newEmployee,
    success: function(response){
      console.log('back from server with a new employee!!', response);
      getEmployees(); 
      $('input').val('');
      $('#employeeInfoTable').empty();
    } //end success
  });//end ajax
}//end collectEmployeeInfo

function displayEmployeeInfo(employeeArray){
  console.log('employee array:', employeeArray);
  for (let index = 0; index < employeeArray.length; index++) {
    let currentEmployee = employeeArray[index];
    let $row = $('<tr>');
  $row.append('<td>' + currentEmployee.firstName + ' ' + currentEmployee.lastName + '</td>');
  $row.append('<td>' + currentEmployee.employeeID + '</td>');
  $row.append('<td>' + currentEmployee.jobTitle + '</td>');
  $row.append('<td class="tdSalary">' + currentEmployee.annualSalary + '</td>');
  $row.append('<td><button class="delete">Delete Employee</button</td>');
  $('#employeeInfoTable').append($row);
  }
  // calculateMonthlyCosts(newEmployee);
} //end displayEmployeeInfo
 
function calculateMonthlyCosts(employeeArray) {
  let totalSalary = 0;
  let employeeSalary = 0;
  for (let index = 0; index < employeeArray.length; index++) {
    employeeSalary = employeeArray[index].annualSalary;
    totalSalary += employeeSalary;
  }
  monthlyCost = Math.round((employeeSalary / 12));  
  $('.monthlyCostDiv').children('h3').text('$' + monthlyCost);
  checkRedAlert();
} //end employeeToAdd

function removeEmployee() {
  let empSalary = $(this).closest('tr').find('.tdSalary').text();
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

function showInputForm () {
  $('.inputForm').show();
}

function exitForm() {
  $('.inputForm').hide();
}

function getEmployees () {
  //get request to server...response to be the updated employees array
  $.ajax({
    method: 'GET',
    url: '/employees',
    success: function(response){
      console.log('back from the server with a new array!', response);
      displayEmployeeInfo(response);
      calculateMonthlyCosts(response);
    }
  });
  
}