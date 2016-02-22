'use strict';

angular.module('epam.prodcomparison.builder').controller(
		'ComparisonConfigurationController',
		[
				'$scope',
				'ProductComparisonRest',
				function($scope, ProductComparisonRest) {

					$scope.comparisonConfig = {
					    "config_id" : "max_products_number",
					    "config_value": "1"
					}


					ProductComparisonRest.comparison
					.one('configs', "max_products_number")
					.get()
					.then(function(configFromServer) {
						$scope.comparisonConfig.config_value = configFromServer.config_value;
					}, function(response) {
						console.log("Error with status code", response.status);
						$scope.comparisonConfig.config_value = 1;
					});

					$scope.updateMaxProduct = function() {
						ProductComparisonRest.comparison
						.all("configs/max_products_number")
						.post($scope.comparisonConfig)
						.then(function(data) {
							alert("config was succesfully updated");
						});
					}
				} ]);
