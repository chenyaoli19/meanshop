'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    return (this.provider && this.provider !== 'local') || (value && value.length);
};

//Address Schema
var AddressSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String
    }, {_id: false});
mongoose.model('Address', AddressSchema);

//Billing Schema
var BillingSchema = new Schema({
    cardtype: {type: String, enum:['Visa','MasterCard','Amex']},
    name: String,
    number:String,
    expiremonth:Number,
    expireyear:Number,
    address:[AddressSchema]
    },{_id:false});
mongoose.model('Billing',BillingSchema);

/**
 * Product Schema
 */
var ProductSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productDecs: {
        type: String,
        required: true,
        trim: true
    },
    imageFile:String,
    price:Number,
    instock:Number
});

/**
 * Validations
 */
ProductSchema.path('productName').validate(function(productName) {
    return !!productName;
}, 'productName cannot be blank');

ProductSchema.path('productDecs').validate(function(productDecs) {
    return !!productDecs;
}, 'productDecs cannot be blank');

ProductSchema.path('price').validate(function(price) {
    return !!price;
}, 'price cannot be blank');

ProductSchema.path('instock').validate(function(instock) {
    return !!instock;
}, 'instock cannot be blank');

ProductSchema.path('imageFile').validate(function(imageFile) {
    return !!imageFile;
}, 'imageFile cannot be blank');
/**
 * Statics
 */
ProductSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Product', ProductSchema);


//Product Quantity Schema
var ProductQuantitySchema = new Schema({
    quantity: Number,
    product: [ProductSchema]
    },{_id:false});
mongoose.model('ProductQuantity',ProductQuantitySchema);

//Order Schema
var OrderSchema = new Schema({
    userid: String,
    items:[ProductQuantitySchema],
    shipping: [AddressSchema],
    billing: [BillingSchema],
    status:{type: String, default:'pending'},
    timestamp:{type:Date,default:Date.now}
    });
mongoose.model('Order',OrderSchema);

/**
 * User Schema
 */
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    roles: {
        type: Array,
        default: ['authenticated']
    },
    hashed_password: {
        type: String,
        validate: [validatePresenceOf, 'Password cannot be blank']
    },
    provider: {
        type: String,
        default: 'local'
    },
    shipping: [AddressSchema],
    billing: [BillingSchema],
    cart: [ProductQuantitySchema],
    salt: String,
    facebook: {},
    twitter: {},
    github: {},
    google: {},
    linkedin: {}
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.hashPassword(password);
}).get(function() {
    return this._password;
});

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    if (this.isNew && this.provider === 'local' && this.password && !this.password.length)
        return next(new Error('Invalid password'));
    next();
});

/**
 * Methods
 */
UserSchema.methods = {

    /**
     * HasRole - check if the user has required role
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    hasRole: function(role) {
        var roles = this.roles;
        return roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1;
    },

    /**
     * IsAdmin - check if the user is an administrator
     *
     * @return {Boolean}
     * @api public
     */
    isAdmin: function() {
        return this.roles.indexOf('admin') !== -1;
    },

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.hashPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Hash password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    hashPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

mongoose.model('User', UserSchema);

//Add other user dependent schemas



//Add other models for the shopping cart
