'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Products = new Module('products');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Products.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Products.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users

    Products.menus.add({
        title: 'Products',
        link: 'all products',
        roles: ['authenticated'],
        menu: 'main'
    });
    
    Products.menus.add({
        title: 'Add Products',
        link: 'add product',
        roles: ['admin'],
        menu: 'main'
    });

    Products.menus.add({
        title: 'Cart',
        link: 'show cart',
        roles: ['authenticated'],
        menu: 'main'
    });

    Products.menus.add({
        title: 'Orders',
        link: 'all orders',
        roles: ['authenticated'],
        menu: 'main'
    });
    
    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Products.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Products.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Products.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Products;
});
