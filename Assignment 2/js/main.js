/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Ilias Halemi  Student ID: 062111133  Date: January 27th, 2019
*
*
********************************************************************************/
let employeesModel = [];
let allEmployees;
initializeEmployeeModel();

function initializeEmployeeModel()
{
    $.ajax({
        url:"https://quiet-crag-62906.herokuapp.com/employees",
        type: "GET",
        contentType: "application/json"
    })
    .done(function (employees) 
    {
        for(let i = 0; i < 300; i++)
            employeesModel[i] = employees[i];

        refreshEmployeeRows(employeesModel);
    })
    .fail(function (err)
    {
        showGenericModal('Error', 'Unable to get Employees');
    })
}

function showGenericModal(title, message) 
{
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    modalTitle.empty();
    modalBody.empty();

    modalTitle.html(title);
    modalBody.html(message);
    $('#genericModal').modal('show');
}

function refreshEmployeeRows(employees)
{
    let rowTemplate = _.template('<% _.forEach(employeesModel, function(employee) { %>' +
                                '<div class="row body-row" data-id="<%- employee._id %>">' +
                                '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
                                '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
                                '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
                                '</div>' +
                            '<% }); %>');

    let rows = rowTemplate({'employeesModel': employees});
    let tbody;

    tbody=$("#employee-table");
    tbody.empty();
    tbody.append(rows);
}

function  getFilteredEmployeesModel(filterString)
{
    let filteredEmp;
    filteredEmp = _.filter(employeesModel, function(employee)
    {
        var cis = new RegExp(filterString, 'i');

        if(employee.FirstName.search(cis) != -1 || employee.LastName.search(cis) != -1 || employee.Position.PositionName.search(cis) != -1)
        {
            return employee;
        }
    });

    return filteredEmp;
}

function getEmployeeModelById(id) 
{
    let find = _.find(employeesModel, function(employee)
    {
        if(employee._id == id)
        {
            console.log(_.cloneDeep(employee));

            return _.cloneDeep(employee);
        }else
        {
            return null;
        }
    });

    return find;
}

$( document ).ready(function() 
{
   $('#employee-search').on('keyup', function()
   {
       let searchStr = $('#employee-search').val();
       refreshEmployeeRows(getFilteredEmployeesModel(searchStr))
   });

   $('.bootstrap-header-table').on('click', '.body-row', function()
   {
        let copy = getEmployeeModelById($(this).attr('data-id'));

        $("body-row").data("data-id", copy);

        let fullName = copy.FirstName + copy.LastName;
        let mDate = moment(copy.HireDate);
        mDate.utc();

        let requiredDate = mDate.format("MMMM Do, YYYY");
        copy.HireDate = requiredDate;

        let clickedTemp = _.template('<strong>Address: </strong><%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %> <%- employee.AddressZip %> <br/>' +
                                    '<strong>Phone Number: </strong><%- employee.PhoneNum %> ext: <%- employee.Extension %> <br/>' +
                                    '<strong>Hire Date: </strong><%- employee.HireDate %>');

        let emp = clickedTemp({'employee': copy});
        showGenericModal(fullName, emp);
   });
});