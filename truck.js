(function(window){
    'use strict';
    var App = window.App || {};
    function Truck (truckID, db){
        this.truckID = truckID;
        this.db = db;

    }
    Truck.prototype.createOrder = function(order){
        console.log('Adding order for '+ order.emailAddress);
        return this.db.add(order.emailAddress,order);
    };
    Truck.prototype.deliverOrder = function(customerID){
        console.log('Delivering order for '+customerID);
        return this.db.remove(customerID);

    };
    Truck.prototype.printOrders = function(printFn){
        return this.db.getAll()
        .then(function(orders){
        
        var customerIDArray = Object.keys(orders);
        console.log('Truck #'+this.truckID+' has pending orders:');
        customerIDArray.forEach(function(id){
            console.log(orders[id]);
            if(printFn){
                printFn(orders[id]);
            }

        }.bind(this));
    }.bind(this));
    };
    App.Truck = Truck;
    window.App = App;
})(window);