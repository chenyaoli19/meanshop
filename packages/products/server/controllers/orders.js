'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Address = mongoose.model('Address'),
    Billing = mongoose.model('Billing'),
    Order = mongoose.model('Order');


exports.getOrder = function(req,res){
    Order.findOne({_id: req.query.orderId}).exec(function(err,order){
        if(!order){
            res.json(404,{msg:'Order Not Found!'});
        }else{
            res.json(order);
        }
    });
};

exports.getOrders = function(req,res){
    Order.find({userid:req.query.userId}).exec(function(err,orders){
        if(!orders){
            res.json(404,{msg:'Orders Not Found!'});
        }else{
            res.json(orders);
        }
    });
};

exports.addOrder = function(req,res){
    var orderShipping = new Address(req.body.orderShipping);
    var orderBilling = new Billing(req.body.orderBilling);
    var orderItems = req.body.orderItems;
    var newOrder = new Order({userid: req.body.userId,
                            items: orderItems,
                            shipping: orderShipping,
                            billing: orderBilling});
    newOrder.save(function(err,results){
        if(err){
            res.json(500,'Failed to save order!');
        }else{
            User.update({_id:req.body.userId},{$set:{cart:[]}}).exec(function(err,results){
                if(err||results<1){
                    res.json(404,{msg:'Failed to update cart!'});
                }else{
                    res.json({msg:'Order saved!'});
                }
            });
        }
    });
};