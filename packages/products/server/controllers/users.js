'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Address = mongoose.model('Address'),
    Billing = mongoose.model('Billing');

exports.updateShipping = function(req,res){
    var newShipping = new Address(req.body.updatedShipping);
    User.update({_id:req.body.userId},{$set:{shipping:[newShipping.toObject()]}}).exec(function(err,results){
        if(err||results<1){
            res.json(404,{msg:'Failed to update Shipping!'});
        }else{
            res.json({msg:'User shipping updated!'});
        }
    });
};

exports.updateBilling = function(req,res){
    //This is where you could verify the credit card information
    //and halt the checkout if it is invalid
    var newBilling = new Billing(req.body.updatedBilling);
    User.update({_id:req.body.userId},
                {$set:{billing:[newBilling.toObject()]}}).exec(function(err,results){
                    if(err||results<1){
                        res.json(404,{msg:'Failed to update Billing!'});
                    }else{
                        res.json({msg:'User Billing Updated!'});
                    }
                });
};

exports.updateCart = function(req,res){
    User.update({_id:req.body.userId},
        {$set:{cart:req.body.updatedCart}}).exec(function(err,results){
            if(err||results<1){
                res.json(404,{msg:'Failed to update Cart!'});
            }else{
                res.json({msg:'User Cart Updated!'});
            }
        });
};