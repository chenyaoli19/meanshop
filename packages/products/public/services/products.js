'use strict';

//Products service used for products REST endpoint

angular.module('mean.products').factory('Products', ['$resource',
	function($resource) {
		return $resource('products/:productId', {
			productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('mean.products').factory('User', ['$resource',
	function($resource) {
		return $resource('user/:userId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
