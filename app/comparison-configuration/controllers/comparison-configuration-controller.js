'use strict';

angular.module('epam.prodcomparison.builder').controller(
		'ComparisonConfigurationController',
		[
				'$scope',
				'ProductComparisonRest',
				function($scope, ProductComparisonRest) {

					$scope.maxInComparison = 1;
					$scope.defaultSortingStategy = "";

					var maxProductsNumberKey = "max_products_number";

					ProductComparisonRest.comparison
					.one('config',maxProductsNumberKey)
					.get().then(function(data) {
						$scope.maxInComparison = data.config_value;
					}, function(response) {
						  console.log("Error with status code", response.status);
						  $scope.maxInComparison = 1;
					});

					$scope.updateMaxProduct = function() {
						ProductComparisonRest.comparison
						.all("config")
						.post("max_products_number", {
							"config_id" : maxProductsNumberKey,
							"config_value" : $scope.maxProductsNumberKey
						}).then(function(data) {
							alert("config was succesfully updated");
						});
					}
				} ]);
