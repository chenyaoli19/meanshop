'use strict';

var products = require('../controllers/products');
var users = require('../controllers/users');
var orders = require('../controllers/orders');

// Product authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Products, app, auth) {

    app.route('/products')
        .get(products.all)
        .post(auth.requiresLogin, products.create);
    app.route('/products/:productId')
        .get(products.show)
        .put(auth.requiresLogin, hasAuthorization, products.update)
        .delete(auth.requiresLogin, hasAuthorization, products.destroy);   
    app.route('/users/update/shipping')
        .post(auth.requiresLogin,users.updateShipping);
    app.route('/users/update/billing')
        .post(auth.requiresLogin,users.updateBilling);
    app.route('/users/update/cart')
        .post(auth.requiresLogin,users.updateCart);
    app.route('/orders/get')
        .get(orders.getOrders);
    app.route('/orders/add')
        .post(auth.requiresLogin,orders.addOrder);
    /*
    app.get('/orders/get',orders.getOrders);
    app.post('/orders/add',orders.addOrder);
    app.get('/users/get',users.getUser);
    app.post('/users/update/shipping',users.updateShipping);
    app.post('/users/update/billing',users.updateBilling);
    app.post('/users/update/cart',users.updateCart);
    */
    // Finish with setting up the productId param
    app.param('productId', products.product);
};
