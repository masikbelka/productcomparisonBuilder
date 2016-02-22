'use strict';

angular.module('epam.prodcomparison.builder')
    .controller('ComparisonConfigurationController', ['$scope', 'ProductComparisonRest', 
        function ($scope, ProductComparisonRest) {
    		
    	$scope.maxInComparison = 1; 
    	$scope.defaultSortingStategy = ""; 
    	
    	var maxProductsNumberKey = "max_products_number";
    	
    	ProductComparisonRest.comparison
	        .one('config', maxProductsNumberKey)
	        .get()
	        .then(function(data) {
	        	$scope.maxInComparison = data.config_value;
	        });
        
    	$scope.updateMaxProduct = function() {
    		ProductComparisonRest.comparison
	        .one('config', maxProductsNumberKey)
	        .post({
	        	"config_id": maxProductsNumberKey,
	        	"config_value": $scope.maxProductsNumberKey
	        })
	        .then(function(data) {
	        	alert("config was succesfully updated");
	        });
    	}
    
    ]);


