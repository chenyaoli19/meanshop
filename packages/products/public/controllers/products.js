'use strict';

angular.module('mean.products').controller('ProductsController', ['$rootScope', '$scope', '$http', '$window', '$stateParams', '$location', 'Global', 'Products',
    function($rootScope, $scope, $http, $window, $stateParams, $location, Global, Products) {
        $scope.global = Global;
        $scope.cart = $scope.global.user.cart;
        $scope.shipping = $scope.global.user.shipping;
        $scope.billing = $scope.global.user.billing;
        $scope.months=[1,2,3,4,5,6,7,8,9,10,11,12];
        $scope.years=[2014,2015,2016,2017,2018,2019,2020];

        $scope.hasAuthorization = function(product) {
            if (!product) return false;
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var product = new Products({
                    productName: this.productName,
                    productDecs: this.productDecs,
                    price: this.price,
                    instock: this.instock,
                    imageFile: this.imageFile
                });
                product.$save(function(response) {
                    $location.path('products/' + response._id);
                });

                this.productName = '';
                this.productDecs = '';
                this.price = '';
                this.instock = '';
                this.imageFile = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(product) {
            if (product) {
                product.$remove();
                for (var i in $scope.products) {
                    if ($scope.products[i] === product) {
                        $scope.products.splice(i, 1);
                    }
                }
            } else {
                $scope.product.$remove(function(response) {
                    $location.path('products');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var product = $scope.product;
                if (!product.updated) {
                    product.updated = [];
                }
                product.updated.push(new Date().getTime());

                product.$update(function() {
                    $location.path('products/' + product._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Products.query(function(products) {
                $scope.products = products;
            });
        };       

        $scope.findOrders = function(){
                $http({ url: '/orders/get',
                    method: 'GET',
                    params: {userId: $scope.global.user._id}
                 })
                .success(function(data,status,headers,config){
                    $scope.orders = data; 
                }).error(function(data,status,headers,config){
                    $scope.orders=[];
                });
        };

        $scope.findOne = function() {
            Products.get({
                productId: $stateParams.productId
            }, function(product) {
                $scope.product = product;
            });
        };

        $scope.cartTotal = function(){
            var total=0;
            $scope.shippingPrice = 0;
            if(typeof $scope.cart === 'undefined'){
                return 0;
            }else{
                for(var i=0;i<$scope.cart.length;i++){
                    var item=$scope.cart[i];
                    total+=item.quantity*item.product[0].price;
                }
                $scope.shippingPrice=total*0.05;
                return total;
            }            
        };

        
        $scope.addToCart = function(productId){         
            var found =false;     
            if(typeof $scope.cart === 'undefined'){
                $scope.cart.push({quantity:1, product:[this.product]});
            } else{
                for(var i=0;i<$scope.cart.length;i++){
                    var item=$scope.cart[i];
                    if(item.product[0]._id===productId){
                        item.quantity+=1;
                        found=true;
                    }
                }
                if(!found){
                    $scope.cart.push({quantity:1, product:[this.product]});
                }
            }  
       
            $http.post('/users/update/cart',{updatedCart:$scope.cart, userId:$scope.global.user._id})
            .success(function(data,status,headers,config){
                $location.path('/cart/update');
            }).error(function(data,status,headers,config){
                $window.alert(data);
            });
        };
        
        $scope.goTo = function(path){
            $location.path(path);
        };

        $scope.deleteFromCart = function(productId){
            for(var i=0;i<$scope.cart.length;i++){
                var item=$scope.cart[i];
                if(item.product[0]._id===productId){
                    $scope.cart.splice(i,1);
                    break;
                }
            }
            $http.post('/users/update/cart', {updatedCart:$scope.cart})
            .success(function(data,status,headers,config){
                $location.path('/cart/update');
            })
            .error(function(data,status,headers,config){
                //$window.alert(data);
            });
        };
        

        $scope.checkout = function(){
            $http.post('/users/update/cart',{updatedCart:$scope.cart, userId:$scope.global.user._id})
            .success(function(data,status,headers,config){
                $location.path('/cart/shipping');
            }).error(function(data,status,headers,config){
                $window.alert(data);
            });
        };
        
        
        $scope.setShipping= function(){
            $http.post('/users/update/shipping',{updatedShipping:$scope.shipping[0], userId:$scope.global.user._id})
            .success(function(data,status,headers,config){
                $location.path('/cart/billing');
            }).error(function(data,status,headers,config){
                $window.alert(data);
            });
        };
        
        $scope.verifyBilling=function(ccv){
            $http.post('/users/update/billing',{updatedBilling:$scope.billing[0],ccv:ccv,userId:$scope.global.user._id})
            .success(function(data,status,headers,config){
                $location.path('/cart/review'); 
            }).error(function(data,status,headers,config){
                $window.alert(data);
            });
        };
        
        $scope.makePurchase=function(){
            $http.post('/orders/add',{orderBilling:$scope.billing[0],
                                    orderShipping:$scope.shipping[0],
                                    orderItems:$scope.cart,
                                    userId:$scope.global.user._id})
            .success(function(data,status,headers,config){
                $scope.cart=[];
                $http({ url: '/orders/get',
                    method: 'GET',
                    params: {userId: $scope.global.user._id}
                 })
                .success(function(data,status,headers,config){
                    $scope.orders = data;
                    $location.path('/cart/order'); 
                }).error(function(data,status,headers,config){
                    $scope.orders=[];
                });
            }).error(function(data,status,headers,config){
                $window.alert(data);
            });
        };
    }
]);

