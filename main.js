(function(window){
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var Checklist = App.Checklist;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var webshim = window.webshim;
    var myTruck = new Truck('Serenity', new DataStore());
    window.myTruck = myTruck;
    var checklist = new Checklist(CHECKLIST_SELECTOR);
    checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data){
        return myTruck.createOrder.call(myTruck,data)
        .then(function(){
        checklist.addRow.call(checklist,data);
        }
        );
    });
    formHandler.addInputHandler(Validation.isCompanyEmail);
    myTruck.printOrders(checklist.addRow.bind(checklist));
    webshim.polyfill('forms forms-ext');
    webshim.setOptions('forms', { addValidators:true,lazyCustomMessages:true});
    
})(window);
