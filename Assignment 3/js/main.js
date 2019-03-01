/*********************************************************************************
*  WEB422 –Assignment03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually orelectronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Ilias Halemi  Student ID: 062111133  Date: February 10, 2019
*
*********************************************************************************/ 

let viewModel = {
    teams: ko.observableArray([]),
    employees: ko.observableArray([]),
    projects: ko.observableArray([])
};

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

function initializeTeams() 
{
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "https://quiet-crag-62906.herokuapp.com/teams-raw",
            type: "GET", 
            contentType: "application/json" 
        })
        .done(function(data) {
            viewModel.teams = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function(err) {
            reject("Error loading the team data.");
        });
    });
}

function initializeEmployees() 
{
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "https://quiet-crag-62906.herokuapp.com/employees",
            type: "GET", 
            contentType: "application/json" 
        })
        .done(function(data) {
            viewModel.employees = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function(err) {
            reject("Error loading the employee data.");
        });
    });
}

function initializeProjects() 
{
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "https://quiet-crag-62906.herokuapp.com/projects",
            type: "GET", 
            contentType: "application/json" 
        })
        .done(function(data) {
            viewModel.projects = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function(err) {
            reject("Error loading the project data.");
        });
    });
}

function saveTeam() {
    var currentTeam = this;

    $.ajax({
        url: "https://quiet-crag-62906.herokuapp.com/team/" + currentTeam._id(), 
        type: "PUT",
        contentType: "application/json", 
        data: JSON.stringify ({
            "Projects": currentTeam.Projects(),
            "Employees": currentTeam.Employees(),
            "TeamLead": currentTeam.TeamLead()
        })
    })
    .done(function() {
        showGenericModal("Success", currentTeam.TeamName() + " Updates Successfully");
    })
    .fail(function() {
        showGenericModal("Error", "Error updating the team information.");
    });
}

$(function() {

    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function() {
        ko.applyBindings(viewModel);

        $(".multiple").multipleSelect({ filter: true });
        $(".select").multipleSelect({ single: true, filter: true });
    })
    .catch(function(err) {
        showGenericModal("Error", err);
    });

});