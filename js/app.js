var app = app || {};
var ENTER_KEY = 13; 

$(function () {

    $('#datepicker').datepicker();

    new app.AppView();
});